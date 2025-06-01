import express from 'express'
import { getParkingSlot, getParkingSlots } from '../controllers/parkingSlotController.js';


const searchRouter = express.Router();

searchRouter.get('/', getParkingSlots);
searchRouter.get('/:id', getParkingSlot);

export default searchRouter;
