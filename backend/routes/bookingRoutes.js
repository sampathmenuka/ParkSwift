import express from 'express'
import {authorizeRoles, userAuth} from '../middleware/userAuth.js'
import {cancelBooking, getActiveBookings, getBookingHistory} from '../controllers/bookingController.js'



const bookingRouter = express.Router();


bookingRouter.get('/active-booking', userAuth, authorizeRoles('user'), getActiveBookings);

bookingRouter.get('/booking-history', userAuth, authorizeRoles('user'), getBookingHistory);

bookingRouter.put('/cancel/:bookingId', userAuth, authorizeRoles('user'), cancelBooking);


export default bookingRouter;