import mongoose, { Schema, model } from 'mongoose';
import { ClientDocument } from '../../types';

const clientSchema: Schema<ClientDocument> = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    notes: {
        type: String,
    },
    referredBy: {
        type: String,
    },
    previousProcedures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreviousProcedure',
    }],
    photos: [String],
}, { timestamps: true });

const Client = model<ClientDocument>('Client', clientSchema);
export default Client;
