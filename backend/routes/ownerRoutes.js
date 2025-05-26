import express from 'express'
import { addSlot, changePassword, deleteAccount, deleteSlot, getBookingsForOwner, getMySlots, getOwnerEarnings, getProfile, updateProfile, updateSlot, withdrawMoney } from '../controllers/ownerController.js';
import { userAuth, authorizeRoles } from '../middleware/userAuth.js'
import upload from '../middleware/multer.js';

const ownerRouter = express.Router();

ownerRouter.post('/slot', upload.single('images'), userAuth, authorizeRoles('owner'), addSlot);
ownerRouter.get('/slots', userAuth, authorizeRoles('owner'), getMySlots);
ownerRouter.put('/slot/:id', upload.single('images') ,userAuth, authorizeRoles('owner'), updateSlot);
ownerRouter.delete('/slot/:id', userAuth, authorizeRoles('owner'), deleteSlot);

ownerRouter.get('/profile', userAuth, authorizeRoles('owner'), getProfile);
ownerRouter.put('/profile', userAuth, authorizeRoles('owner'), updateProfile );
ownerRouter.put('/change-password', userAuth, authorizeRoles('owner'), changePassword);
ownerRouter.delete('/delete-account', userAuth, authorizeRoles('owner'), deleteAccount);

ownerRouter.get('/bookings', userAuth, authorizeRoles('owner'), getBookingsForOwner);

ownerRouter.get('/earnings', userAuth, authorizeRoles('owner'),getOwnerEarnings);
ownerRouter.post('/withdraw', userAuth, authorizeRoles('owner'), withdrawMoney);


export default ownerRouter;
