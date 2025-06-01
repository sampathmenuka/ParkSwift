import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

import authRouter from './routes/authRoutes.js'
import dashboardRouter from './routes/dashboardRoutes.js'
import userRouter from './routes/userRoutes.js'
import bookingRouter from './routes/bookingRoutes.js'
import notificationRouter from './routes/notificationRoutes.js'
import ownerRouter from './routes/ownerRoutes.js'
import searchRouter from './routes/parkingSlotRoutes.js'
import reviewRouter from './routes/reviewRoutes.js'
import paymentRouter from './routes/paymentRoutes.js'
import { stripeWebhook } from './controllers/paymentController.js'
import availableCheckRouter from './routes/availabilityRoutes.js'


const app = express();
const port = 4000 || process.env.PORT;

connectDB();
connectCloudinary();

const allowedOrigins = ['http://localhost:5173']
app.use(cors({origin: allowedOrigins, credentials: true}));

app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhook);


app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send("Welcome to my backend");
})


app.use('/api/auth', authRouter);

app.use('/api/dashboard', dashboardRouter);

app.use('/api/user', userRouter);

app.use('/api/bookings', bookingRouter);

app.use('/api/notifications', notificationRouter);

app.use('/api/owner', ownerRouter);

app.use('/api/slots', searchRouter);

app.use('/api/reviews', reviewRouter);

app.use("/api/availability", availableCheckRouter);

app.use('/api/payment', paymentRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
})
