import mongoose, { Schema, Document, Types } from 'mongoose';

export interface AppointmentDocument extends Document {
    master: Types.ObjectId;
    client: Types.ObjectId;
    date: Date;
    time: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    service: Types.ObjectId;
    notes?: string;
}

const appointmentSchema: Schema = new Schema({
    master: {
        type: Types.ObjectId,
        ref: 'Master',
        required: true,
    },
    client: {
        type: Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
    service: {
        type: Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    notes: {
        type: String,
    },
}, { timestamps: true });

const Appointment = mongoose.model<AppointmentDocument>('Appointment', appointmentSchema);

export default Appointment;
