import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import massageRoutes from './routes/massage.routes.js';
import userRoutes from './routes/user.routes.js';
import { connect } from 'mongoose';
import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json()); // to parse the incoming request as the json payload from (req.body)
app.use(cookieParser()); 
app.use('/api/auth', authRoutes);
app.use('/api/massage', massageRoutes);
app.use('/api/users', userRoutes);
app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});