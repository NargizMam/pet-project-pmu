import express, { Request, Response } from 'express';
import Client from "../models/client/clientModel";

const clientsRouter = express.Router();

clientsRouter.get('/', async (req: Request, res: Response, next) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (e) {
        next(e);
    }
});

clientsRouter.get('/:id', async (req: Request, res: Response, next) => {
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

clientsRouter.post('/', async (req: Request, res: Response, next) => {
    const client = new Client({
        fullName: req.body.fullName,
        user: req.body.user,
        contact: req.body.contact,
        birthday: req.body.birthday,
        gender: req.body.gender,
        notes: req.body.notes,
        referredBy: req.body.referredBy,
        previousProcedures: req.body.previousProcedures,
        photos: req.body.photos
    });
    try {
        const newClient = await client.save();
        res.status(201).json(newClient);
    } catch (e) {
        next(e);
    }
});

clientsRouter.put('/:id', async (req: Request, res: Response, next) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client);
    } catch (e) {
        next(e);
    }
});

// DELETE: Удалить клиента
clientsRouter.delete('/:id', async (req: Request, res: Response, next) => {
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

