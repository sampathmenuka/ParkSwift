import express from 'express'
import { authorizeRoles, userAuth } from '../middleware/userAuth.js';
import {getNotifications, markAllAsRead, markAsReadUnread} from '../controllers/notificationController.js'

const notificationRouter = express.Router();


notificationRouter.get('/', userAuth, authorizeRoles('user'), getNotifications);

notificationRouter.patch('/:id', userAuth, authorizeRoles('user'), markAsReadUnread);

notificationRouter.patch('/', userAuth, authorizeRoles('user'), markAllAsRead);


export default notificationRouter;