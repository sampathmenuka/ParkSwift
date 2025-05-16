import moment from 'moment'
import bookingModel from '../models/bookingModel.js'

// getting booking details that is currently active(success)
export const getActiveBookings = async (req, res) => {
  const now = moment();

  try {
    const bookings = await bookingModel.find({
      user: req.user._id,
      endTime: { $gte: now.toDate() },
      status: { $in: ['Confirmed', 'In-progress'] }
    }).sort( { startTime: 1 })

    if (!bookings) {
      return res.json({success: false, message: "Error in getting active bookings"})
    }

    res.json({ success: true, bookings });

  } catch (error) {
      return res.json({ success: false, message: error.message });
  }
} 


// getting past booking history(success)
export const getBookingHistory = async (req, res) => {
  const now = moment();

  try {

    const bookings = await bookingModel.find({ user: req.user._id, endTime: { $lt: now.toDate() } }).sort({ endTime: -1 });

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

    const diff = moment(booking.startTime).diff(moment(), 'minutes')

    if (diff <= 30) {
      return res.json({ success: false, message: 'Cannot cancel within 30 minutes of start time' });
    }
    
    res.json({ success: true, message: 'Booking cancelled' });

  } catch (error) {
      res.json({ success: false, message: error.message });
  }
}