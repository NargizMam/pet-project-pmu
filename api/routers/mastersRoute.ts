import express, { Request, Response, NextFunction } from 'express';
import Master from "../models/master/masterModel";
import mongoose from "mongoose";


const masterRouter = express.Router();

masterRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const masters = await Master.find();
        res.json(masters);
    } catch (error) {
        next(error);
    }
});

masterRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const master = await Master.findById(req.params.id).populate('services', 'title');
        if (!master) {
            return res.status(404).json({ message: 'Master not found' });
        }
        res.send(master);
    } catch (error) {
        next(error);
    }
});

masterRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { services, ...masterData } = req.body;

        const master = await Master.create({
            ...masterData,
            services: services.map((serviceId: string) => new mongoose.Types.ObjectId(serviceId)),
        });

        res.status(201).json(master);
    } catch (error) {
        next(error);
    }
});


masterRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const master = await Master.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!master) {
            return res.status(404).json({ message: 'Master not found' });
        }
        res.json(master);
    } catch (error) {
        next(error);
    }
});

masterRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const master = await Master.findByIdAndDelete(req.params.id);
        if (!master) {
            return res.status(404).json({ message: 'Master not found' });
        }
        res.json({ message: 'Master deleted successfully' });
    } catch (error) {
        next(error);
    }
});

export default masterRouter;
