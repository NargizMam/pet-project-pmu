import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import userRouter from './routers/userRouter';
import servicesRoute from "./routers/servicesRoute";
import mastersRoute from "./routers/mastersRoute";
import appointmentRouter from "./routers/appointmentsRoute";

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/services', servicesRoute);
app.use('/masters', mastersRoute);
app.use('/clients', mastersRoute);
app.use('/appointments', appointmentRouter);


const run = async () => {
    await mongoose.connect(config.mongoose.db);

    app.listen(config.port, () => {
        console.log(`Server started on ${config.port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};


void run();
