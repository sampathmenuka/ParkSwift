import bookingModel from "../models/bookingModel.js";
import parkingSlotModel from "../models/parkingSlotModel.js";
import stripe from "../utils/stripe.js";


export const createCheckoutSession = async (req, res) => {

  try {
    
    const {slotId, userId, date, startTime, endTime, duration, totalPayment } = req.body;

    const slot = await parkingSlotModel.findOne({
      _id: slotId,
      bookedTimes: {
        $not: {
          $elemMatch: {
            date: date,
            startTime: { $lt: endTime },
            endTime: { $gt: startTime },
          }
        }
      }
    });

    if (!slot) {
      return res.json({ success: false, message: "Slot is not available for the selected time range." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'lkr',
          product_data: {
            name: 'Parking Slot Booking',
            description: `Booking on ${date}, ${startTime} - ${endTime}`,
          },
          unit_amount: Math.round(totalPayment * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
      metadata: {
        slotId,
        userId,
        date,
        startTime,
        endTime,
        duration,
        totalPayment,
      },
    });

    res.json({success: true, url: session.url})

  } catch (error) {
      res.json({ success: false, message: error.message })
  }
}


export const stripeWebhook = async (req, res) => {

  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("✅ Webhook received:", event.type);
  } catch (error) {
      return res.json({ success: false, message: error.message });
  }

  if (event.type === 'payment_intent.succeeded') {
    console.log("✅ Payment intent succeeded");

    const paymentIntent = event.data.object;
    const metadata = paymentIntent.metadata;

    try {

      // Prevent duplicate bookings
      const existingBooking = await bookingModel.findOne({
        user: metadata.userId,
        slot: metadata.slotId,
        date: metadata.date,
        startTime: metadata.startTime,
        endTime: metadata.endTime,
      });

      if (existingBooking) {
        console.log("⚠️ Booking already exists");
        return res.json({ success: false, message: "Booking already exists." });
      }

      // Re-check availability
      const slotAvailable = await parkingSlotModel.findOne({
        _id: metadata.slotId,
        bookedTimes: {
          $not: {
            $elemMatch: {
              date: metadata.date,
              startTime: { $lt: metadata.endTime },
              endTime: { $gt: metadata.startTime }
            }
          }
        }
      });

      if (!slotAvailable) {
        return res.json({ success: false, message: "Slot was just booked by someone else." });
      }
      
      await bookingModel.create({
        user: metadata.userId,
        slot: metadata.slotId,
        date: metadata.date,
        startTime: metadata.startTime,
        endTime: metadata.endTime,
        duration: metadata.duration,
        totalPayment: paymentIntent.amount / 100,
        status: 'In-progress',
      });

      await parkingSlotModel.updateOne(
        { _id: metadata.slotId },
        {
          $push: {
            bookedTimes: {
              date: metadata.date,
              startTime: metadata.startTime,
              endTime: metadata.endTime
            }
          }
        }
      );

      console.log("✅ Booking and slot update successful");
      res.json({success: true, message: "Booking created and slot marked as booked"});
      
    } catch (error) {
        console.error('Failed to create booking:', error.message);
        res.json({ success: false, message: 'Failed to create booking' })
    }
  } else {
      res.status(200).send("Event received");
  }
}


export const createPaymentIntent = async (req, res) => {

  try {
    
    const { amount, metadata } = req.body;

    if (amount < 170 * 100) {
      return res.json({ success: false, message: "Amount must be at least Rs. 165 (Stripe minimum requirement)." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'lkr',
      metadata,
    })

    res.json({ success: true, clientSecret: paymentIntent.client_secret });

  } catch (error) {
      console.error("Error creating payment intent:", error);
      res.json({ success: false, message: error.message });
  }
}