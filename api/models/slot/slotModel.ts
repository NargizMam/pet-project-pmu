import mongoose, { Schema } from 'mongoose';
import { SlotDocument } from '../../types';


const slotSchema: Schema = new Schema({
  master: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Master',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  availableSlots: [{
    type: String,
    required: true,
  }],
}, { timestamps: true });

const Slot = mongoose.model<SlotDocument>('Slot', slotSchema);

export default Slot;
