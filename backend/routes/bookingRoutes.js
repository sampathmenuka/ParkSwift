import express from 'express'
import {authorizeRoles, userAuth} from '../middleware/userAuth.js'
import {cancelBooking, clearBookingHistory, createBooking, getActiveBookings, getBookingHistory, markAsParked} from '../controllers/bookingController.js'


const bookingRouter = express.Router();

bookingRouter.get('/active-booking', userAuth, authorizeRoles('user'), getActiveBookings);
bookingRouter.get('/booking-history', userAuth, authorizeRoles('user'), getBookingHistory);
bookingRouter.put('/cancel/:bookingId', userAuth, authorizeRoles('user'), cancelBooking);
bookingRouter.delete('/clear-history', userAuth, authorizeRoles('user'), clearBookingHistory);
bookingRouter.put('/mark-parked/:id', userAuth, authorizeRoles('user'), markAsParked);
bookingRouter.post('/create', userAuth, createBooking);


export default bookingRouter;