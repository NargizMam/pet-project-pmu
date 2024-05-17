import express, { Request, Response, NextFunction } from 'express';
import Appointment from '../models/appontment/appointmentModel';

const appointmentRouter = express.Router();

appointmentRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const appointments = await Appointment.find()
          .populate('service', 'title')
          .populate('master', 'fullName')
          .populate('client', 'fullName');
        res.send(appointments);
    } catch (error) {
        next(error);
    }
});

appointmentRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
          .populate('service', 'title')
          .populate('master', 'fullName')
          .populate('client', 'fullName');

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.send(appointment);
    } catch (error) {
        next(error);
    }
});

appointmentRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { master, client, date, time, service, notes } = req.body;
    const appointment = new Appointment({ master, client, date, time, service, notes });

    try {
        const newAppointment = await appointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        next(error);
    }
});

appointmentRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { master, client, date, time, status, service, notes } = req.body;

        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (master) appointment.master = master;
        if (client) appointment.client = client;
        if (date) appointment.date = date;
        if (time) appointment.time = time;
        if (status) appointment.status = status;
        if (service) appointment.service = service;
        if (notes) appointment.notes = notes;

        const updatedAppointment = await appointment.save();
        res.json(updatedAppointment);
    } catch (error) {
        next(error);
    }
});

appointmentRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        next(error);
    }
});

export default appointmentRouter;
