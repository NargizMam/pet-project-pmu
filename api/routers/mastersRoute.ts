import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Master from '../models/master/masterModel';

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

        const master = new Master({
            ...masterData,
            services: services ? services.map((serviceId: string) => new mongoose.Types.ObjectId(serviceId)) : [],
        });

        await master.save();
        res.status(201).json(master);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(422).json(error.errors);
        }
        next(error);
    }
});

masterRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { services, ...masterData } = req.body;

        const updatedMaster = await Master.findByIdAndUpdate(
          req.params.id,
          {
              ...masterData,
              services: services ? services.map((serviceId: string) => new mongoose.Types.ObjectId(serviceId)) : [],
          },
          { new: true, runValidators: true }
        );

        if (!updatedMaster) {
            return res.status(404).json({ message: 'Master not found' });
        }

        res.json(updatedMaster);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(422).json(error.errors);
        }
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
