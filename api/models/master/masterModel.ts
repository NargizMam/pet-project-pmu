import mongoose, { Schema, Types } from 'mongoose';
import { MasterDocument } from '../../types';

const masterSchema: Schema<MasterDocument> = new mongoose.Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    backgroundInfo: {
        type: String,
    },
    experience: {
        type: Number,
        default: 0,
    },
    services: [{
        type: Types.ObjectId,
        ref: 'Service',
    }],
    workingHours: {
        type: Map,
        of: String,
    },
    profileImage: {
        type: String,
        default: 'default.jpg',
    },
}, { timestamps: true });

const Master = mongoose.model<MasterDocument>('Master', masterSchema);

export default Master;
