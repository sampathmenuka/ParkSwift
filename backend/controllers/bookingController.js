import moment from 'moment'
import bookingModel from '../models/bookingModel.js'
import parkingSlotModel from '../models/parkingSlotModel.js';
import stripe from '../utils/stripe.js';


// getting booking details that is currently active(success)
export const getActiveBookings = async (req, res) => {

  const now = moment();

  try {
    let bookings = await bookingModel.find({
      user: req.user._id,
      status: { $in: ['Confirmed'] }
    }).populate('slot')

    if (!bookings) {
      return res.json({success: false, message: "Error in getting active bookings"})
    }

    // Update expired bookings
    for (let booking of bookings) {
      const endMoment = moment(`${booking.date} ${booking.endTime}`, 'YYYY-MM-DD HH:mm');

      if (endMoment.isBefore(now)) {
        booking.status = 'Completed';
        await booking.save();
      }
    }

    // Filter again to only send active bookings
    bookings = bookings.filter(b => b.status !== 'Completed');

    res.json({ success: true, bookings });

  } catch (error) {
      return res.json({ success: false, message: error.message });
  }
} 


// getting past booking history(success)
export const getBookingHistory = async (req, res) => {

  try {

    const bookings = await bookingModel.find({ user: req.user._id, status: { $in: ['Completed', 'Cancelled'] }}).populate('slot');

    if (!bookings) {
      return res.json({success: false, message: "Error in getting past history"})
    }

    res.json({ success: true, bookings });
    
  } catch (error) {
      return res.json({ success: false, message: error.message });
  }
}


// cancel the booking by the assigned user
export const cancelBooking = async (req, res) => {

  const { bookingId } = req.params;

  try {

    const booking = await bookingModel.findOne({ _id: bookingId, user: req.user._id });

    if (!booking) {
      return res.json({success: false, message: "Booking not found"}) 
    }

    if (booking.status === 'Cancelled') {
      return res.json({ success: false, message: "Booking is already cancelled" });
    }

    const bookingDateTime = moment(`${booking.date} ${booking.startTime}`, 'YYYY-MM-DD HH:mm');

    const diff = bookingDateTime.diff(moment(), 'minutes');

    if (diff <= 30) {
      return res.json({ success: false, message: 'Cannot cancel within 30 minutes of start time' });
    }

    if (booking.paymentIntentId) {
      const refund = await stripe.refunds.create({
        payment_intent: booking.paymentIntentId,
      });

      if (refund.status !== "succeeded") {
        return res.json({ success: false, message: "Refund failed" });
      }
    }

    booking.status = 'Cancelled';
    await booking.save();
    
    res.json({ success: true, message: 'Booking cancelled and refund initiated.' });

  } catch (error) {
      res.json({ success: false, message: error.message });
  }
}


// clear booking history
export const clearBookingHistory = async (req, res) => {

  try {
    await bookingModel.deleteMany({ user: req.user._id, status: { $in: ['Completed', 'Cancelled'] } });

    res.json({ success: true, message: "Booking history cleared" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// if i parked successfull and it is completed, below code will be executed whent clicked parked button
export const markAsParked = async (req, res) => {

  try {
    const booking = await bookingModel.findOne({
      _id: req.params.id,
      user: req.user._id,
      status: 'Confirmed'
    });

    if (!booking) {
      return res.json({ success: false, message: 'Booking not found or already completed.' });
    }

    booking.status = 'Completed';
    await booking.save();

    res.json({ success: true, message: 'Booking marked as parked (completed).', slotId: booking.slot });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// checking slot availability...
export const checkSlotAvailability = async (req, res) => {
  try {
    const { slotId, date, startTime, endTime } = req.body;

    const slot = await parkingSlotModel.findById(slotId);

    if (!slot) {
      return res.json({ success: false, message: "Slot not found" });
    }

    const overlappingBookings = await bookingModel.countDocuments({
      slot: slotId,
      date,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime }
    });

    const isAvailable = overlappingBookings < slot.totalSlots;

    res.json({ success: true, available: isAvailable });

  } catch (error) {
    res.status(500).json({ available: false, message: error.message });
  }
};


// after payment successful, this code will be executed 
export const createBooking = async (req, res) => {

  try {
    const { slotId, date, startTime, endTime, duration, totalPrice, paymentIntentId } = req.body

    const userId = req.user._id;

    const slot = await parkingSlotModel.findById(slotId);

    if (!slot) {
      return res.json({ success: false, message: 'Parking slot not found' });
    }

    const existingBooking = await bookingModel.findOne({
      user: userId,
      slot: slotId,
      date: date,
      startTime: startTime,
      endTime: endTime,
    });

    if (existingBooking) {
      return res.json({ success: false, message: "Booking already exists." });
    }

    // Count how many overlapping bookings already exist
    const overlappingBookings = await bookingModel.countDocuments({
      slot: slotId,
      date,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime }
    });

    if (overlappingBookings >= slot.totalSlots) {
      return res.json({ success: false, message: "All slots are already booked for the selected time range." });
    }

    await bookingModel.create({
      user: userId,
      slot: slotId,
      date: date,
      startTime: startTime,
      endTime: endTime,
      duration: duration,
      totalPayment: totalPrice,
      status: 'Confirmed',
      paymentIntentId,
    });

    await parkingSlotModel.updateOne(
      { _id: slotId },
      {
        $push: {
          bookedTimes: {
            date: date,
            startTime: startTime,
            endTime: endTime
          }
        },
      }
    );

    res.json({success: true, message: "Booking created and slot marked as booked"});

  } catch (error) {
      console.error('Booking creation error:', error.message);
      res.json({ success: false, message: 'Failed to create booking', message: error.message });
  }
}