import express from 'express'
import { authorizeRoles, userAuth } from '../middleware/userAuth.js';
import {adminDashboard, ownerDashboard, userDashboard} from '../controllers/dashboardController.js'

const dashboardRouter = express.Router();

dashboardRouter.get('/user', userAuth, authorizeRoles('user'), userDashboard);

dashboardRouter.get('/owner', userAuth, authorizeRoles('owner'), ownerDashboard);

dashboardRouter.get('/admin', userAuth, authorizeRoles('admin'), adminDashboard)


export default dashboardRouter;