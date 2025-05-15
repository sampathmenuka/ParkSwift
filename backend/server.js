import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/mongodb.js'
import authRouter from './routes/authRoutes.js'
import dashboardRouter from './routes/dashboardRoutes.js'


const app = express();
const port = 4000 || process.env.PORT;
connectDB();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get('/', (req, res) => {
  res.send("Welcome to my backend")
})


app.use('/api/auth', authRouter);

app.use('/api/dashboard', dashboardRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
})