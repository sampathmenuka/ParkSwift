import express from "express";
import { checkSlotAvailability } from "../controllers/bookingController.js";


const availableCheckRouter = express.Router();

availableCheckRouter.post("/check", checkSlotAvailability);


export default availableCheckRouter;