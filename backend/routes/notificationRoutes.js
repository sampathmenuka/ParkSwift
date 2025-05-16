import express from 'express'
import { authorizeRoles, userAuth } from '../middleware/userAuth.js';
import {getNotifications} from '../controllers/notificationController.js'

const notificationRouter = express.Router();


notificationRouter.get('/', userAuth, authorizeRoles('user'), getNotifications);


export default notificationRouter;