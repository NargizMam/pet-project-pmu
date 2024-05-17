import mongoose, { Schema } from 'mongoose';
import { PreviousProcedureDocument } from '../../types';

const previousProcedureSchema: Schema = new Schema({
    type: { type: String },
    date: { type: Date },
    notes: { type: String },
    photos: [{ type: String }],
});

const PreviousProcedure = mongoose.model<PreviousProcedureDocument>('PreviousProcedure', previousProcedureSchema);

export default PreviousProcedure;
