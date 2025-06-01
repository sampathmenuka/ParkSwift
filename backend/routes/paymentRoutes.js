import express, { Router } from 'express'
import { userAuth } from '../middleware/userAuth.js';
import { createCheckoutSession, createPaymentIntent } from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/checkout-session', userAuth, createCheckoutSession);

paymentRouter.post('/create-payment-intent', userAuth, createPaymentIntent);

export default paymentRouter;