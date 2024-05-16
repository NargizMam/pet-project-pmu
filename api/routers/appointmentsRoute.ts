import Appointment from "../models/appontment/appointmentModel";
import express, {Request, Response, NextFunction} from "express";

const appointmentRouter = express.Router();

async function getAppointment(req:Request, res: Response, next: NextFunction) {
    let appointment;
    try {
        appointment = await Appointment.findById(req.params.id);
        if (appointment == null) {
            return res.send(404).json({message: 'AppointmentReactSchedule not found'});
        }
    }catch (error) {
        next(error);
    }
    res.send(appointment);
    next();
}

appointmentRouter.get('/', async (_req, res, next) => {
    try {
        const appointments = await Appointment.find().populate('service', 'title');
        res.send(appointments);
    } catch (error) {
    next(error);
    }
});
appointmentRouter.post('/', async (req, res, next) => {
    const appointment = new Appointment({
        master: req.body.master,
        client: req.body.client,
        date: req.body.date,
        time: req.body.time,
        status: req.body.status,
        service: req.body.service,
        notes: req.body.notes
    });
    try {
        const newAppointment = await appointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        next(error);
    }
});
appointmentRouter.put('/:id', getAppointment, async (req, res, next) => {
    const appointmentId = req.params.id;

    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "AppointmentReactSchedule not found" });
        }

        appointment.master = req.body.master || appointment.master;
        appointment.client = req.body.client || appointment.client;
        appointment.date = req.body.date || appointment.date;
        appointment.time = req.body.time || appointment.time;
        appointment.status = req.body.status || appointment.status;
        appointment.service = req.body.service || appointment.service;
        appointment.notes = req.body.notes || appointment.notes;

        const updatedAppointment = await appointment.save();

        res.json(updatedAppointment);
    } catch (error) {
        next(error);
    }
});

appointmentRouter.delete('/:id', getAppointment, async (req, res, next) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'AppointmentReactSchedule not found' });
        }
        res.json({ message: 'AppointmentReactSchedule deleted successfully' });
    } catch (error) {
        next(error);
    }
});
export default appointmentRouter;