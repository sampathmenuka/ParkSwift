import express from 'express'
import { userAuth, authorizeRoles} from '../middleware/userAuth.js'
import {changePassword, deleteAccount, getProfile, updateProfile } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.get('/profile', userAuth, authorizeRoles('user'), getProfile);

userRouter.put('/profile', userAuth, authorizeRoles('user'), updateProfile )

userRouter.put('/change-password', userAuth, authorizeRoles('user'), changePassword)

userRouter.delete('/delete-account', userAuth, authorizeRoles('user'), deleteAccount)

export default userRouter;