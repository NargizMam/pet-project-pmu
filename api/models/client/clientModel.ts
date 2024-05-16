import mongoose, { model } from 'mongoose';
import { ClientApi } from '../../types';

const clientSchema = new mongoose.Schema<ClientApi>({
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

const Client = model<ClientApi>('Client', clientSchema);
export default Client;