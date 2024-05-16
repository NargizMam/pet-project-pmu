import express from 'express';
import Slot from '../models/slot/slotModel';

const slotsRouter = express.Router();

slotsRouter.get('/slots/:masterId', async (req, res, next) => {
  const { masterId } = req.params;
  const { date } = req.query;
  try {
    const slots = await Slot.find({ master: masterId, date: date as string });
    res.json(slots);
  } catch (error) {
    next(error)
  }
});

slotsRouter.post('/slots', async (req, res, next) => {
  const { master, date, availableSlots } = req.body;
  try {
    const slot = new Slot({ master, date, availableSlots });
    await slot.save();
    res.status(201).json(slot);
  } catch (error) {
      next(error)
  }
});