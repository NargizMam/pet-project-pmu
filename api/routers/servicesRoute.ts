import express, { NextFunction, Response } from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { ServiceApi, ServiceMutation } from '../types';
import Service from '../models/service/servicesModel';

const servicesRouter = express.Router();

servicesRouter.get('/', async (_req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const servicesList: ServiceApi[] = await Service.find().populate('master', 'fullName');
        return res.send(servicesList);
    } catch (e) {
        next(e);
    }
});

servicesRouter.post('/', auth, permit('admin'), async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const { title, price, description, duration, master } = req.body;

        if (!title || !price || !description || !duration) {
            return res.status(400).send({ message: 'Missing required fields' });
        }

        const serviceData: ServiceMutation = {
            title,
            price,
            description,
            duration,
            master,
        };

        const service = new Service(serviceData);
        await service.save();
        return res.status(201).send('Service was created!');
    } catch (e) {
        next(e);
    }
});

servicesRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).send('The service may have been removed!');
        }

        return res.send('The service was successfully deleted!');
    } catch (e) {
        next(e);
    }
});

export default servicesRouter;
