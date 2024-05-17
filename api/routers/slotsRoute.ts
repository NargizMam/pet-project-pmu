import express, { Request, Response, NextFunction } from 'express';
import mongoose, { Types } from 'mongoose';
import Slot from '../models/slot/slotModel';

const slotsRouter = express.Router();

slotsRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const slots = await Slot.find().populate('master', 'fullName specialization');
    res.json(slots);
  } catch (error) {
    next(error);
  }
});

slotsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slot = await Slot.find({master: req.params.id}).populate('master', 'fullName specialization');
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    res.json(slot);
  } catch (error) {
    next(error);
  }
});

slotsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { master, date, availableSlots } = req.body;

    const slot = new Slot({
      master: new Types.ObjectId(master as string),
      date,
      availableSlots,
    });

    await slot.save();
    res.status(201).json(slot);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).json(error.errors);
    }
    next(error);
  }
});

slotsRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { master, date, availableSlots } = req.body;

    const slot = await Slot.findByIdAndUpdate(
      req.params.id,
      {
        master: new mongoose.Types.ObjectId(master as string),
        date,
        availableSlots,
      },
      { new: true, runValidators: true }
    );

    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    res.json(slot);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).json(error.errors);
    }
    next(error);
  }
});

slotsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slot = await Slot.findByIdAndDelete(req.params.id);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    res.json({ message: 'Slot deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default slotsRouter;
