import express, { Request, Response, NextFunction } from 'express';
import Client from '../models/client/clientModel';

const clientsRouter = express.Router();

clientsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (e) {
        next(e);
    }
});

clientsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client);
    } catch (e) {
        next(e);
    }
});

clientsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, user, contact, birthday, gender, notes, referredBy, previousProcedures, photos } = req.body;

    const client = new Client({
        fullName,
        user,
        contact,
        birthday,
        gender,
        notes,
        referredBy,
        previousProcedures,
        photos,
    });

    try {
        const newClient = await client.save();
        res.status(201).json(newClient);
    } catch (e) {
        next(e);
    }
});

clientsRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(updatedClient);
    } catch (e) {
        next(e);
    }
});

clientsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json({ message: 'Client deleted' });
    } catch (e) {
        next(e);
    }
});

export default clientsRouter;
