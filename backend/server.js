import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import massageRoutes from './routes/massage.routes.js';
import userRoutes from './routes/user.routes.js';

import { connect } from 'mongoose';
import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js'

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;


app.use(express.json()); // to parse the incoming request as the json payload from (req.body)
app.use(cookieParser()); 
app.use('/api/auth', authRoutes);
app.use('/api/massage', massageRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});