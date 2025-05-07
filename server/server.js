import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRoute from './routes/authRoutes.js';
import userRoute from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js'
import generateRoute from "./routes/generateRoutes.js";


const app = express();
const port = process.env.PORT || 4000;


const allowedOrigins = ['http://localhost:5173']

app.use(cors({ credentials: true ,origin :allowedOrigins}));
app.use(express.json());
app.use(cookieParser());

connectDB();

// API endpoints
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api', projectRoutes);
app.use("/api", generateRoute);




app.listen(port, () => console.log(`Server started at port ${port}`));
