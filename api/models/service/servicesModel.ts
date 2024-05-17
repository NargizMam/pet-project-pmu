import mongoose, { Schema, Types } from 'mongoose';
import { ServiceDocument } from '../../types';

const serviceSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    duration: {
        type: String,
        required: true,
    },
    master: [{
        type: Types.ObjectId,
        ref: 'Master',
    }]
});

const Service = mongoose.model<ServiceDocument>('Service', serviceSchema);

export default Service;
