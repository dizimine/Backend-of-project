import express from 'express';
import dotenv from 'dotenv';
import databaseConnection from './config/dbconnect.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.js';
import shiftRoute from './routes/shift.js';
import headShiftRoute from './routes/headShifts.js';
import { errorMiddleware } from './middleware/error.js';
//import { createShift } from './seeder/worker.js';
//import { createHead } from './seeder/worker.js';
//import { createWorkers } from './seeder/worker.js';
dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/user",userRoute);
app.use("/api/shift",shiftRoute);
app.use("/api/head/shift",headShiftRoute);

databaseConnection();
//createWorkers(50);
//createHead(10);
//createShift(10);
app.get('/',(req,res)=>{
   res.send('Welcome');
})
app.use(errorMiddleware);
app.listen(process.env.PORT||3000,()=>{
    console.log('listening on port 3000');
})