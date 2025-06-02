import express from 'express'
import { authorizeRoles, userAuth } from '../middleware/userAuth.js'
import { deleteSlot, getAllBookings, getAllSlots, getAllUsers, getNotificationStats, getRecentNotifications, getUserById, getUsers, sendNotificationToUser, toggleUserStatus, updateSlotStatus } from '../controllers/adminController.js';

const adminRouter = express.Router();


adminRouter.get('/users', userAuth, authorizeRoles('admin'), getAllUsers);
adminRouter.get('/bookings', userAuth, authorizeRoles('admin'), getAllBookings)
adminRouter.get('/all-users', userAuth, authorizeRoles('admin'), getUsers)
adminRouter.get('/notification-stats', userAuth, authorizeRoles('admin'), getNotificationStats)
adminRouter.get('/recent-notifications', userAuth, authorizeRoles('admin'), getRecentNotifications)

adminRouter.post('/send', userAuth, authorizeRoles('admin'), sendNotificationToUser)

adminRouter.patch('/users/:id/status', userAuth, authorizeRoles('admin'), toggleUserStatus);
adminRouter.get('/:id', userAuth, authorizeRoles('admin'), getUserById);

adminRouter.get('/', userAuth, authorizeRoles('admin'), getAllSlots)
adminRouter.patch('/:id/status', userAuth, authorizeRoles('admin'), updateSlotStatus)
adminRouter.delete('/:id', userAuth, authorizeRoles('admin'), deleteSlot)





export default adminRouter;