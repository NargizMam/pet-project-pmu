import express from 'express';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import {ServiceApi, ServiceMutation} from '../types';
import client from "../middleware/client";
import Service from "../models/service/servicesModel";

const servicesRouter = express.Router();

servicesRouter.get('/', client, async (req: RequestWithUser, res, next) => {
    let servicesList: ServiceApi[] = [];
    try {
        servicesList = await Service.find().populate('masters', 'fullName');
        return res.send(servicesList);
    } catch (e) {
        next(e);
    }
});
servicesRouter.post('/', async (req: RequestWithUser, res, next) => {
    const user = req.user;
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
            master
        };
        const service = new Service(serviceData);
        await service.save();
        return res.send('Service was created!');
    } catch (e) {
        next(e);
    }
});
servicesRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
    const id = req.params.id;

    try {
        let deletedService;
        deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.send('The service may have been removed!');
        }
        return res.send('The service was successfully deleted!');
    } catch (e) {
        next(e);
    }
});

export default servicesRouter;
