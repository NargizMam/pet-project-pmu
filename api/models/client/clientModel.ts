import mongoose from "mongoose";
import previousProcedureSchema from "./../previousProcedur/previousProcedurModel";


const clientSchema = new mongoose.Schema({
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
    previousProcedures: [previousProcedureSchema],
    photos: [String],
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

export default Client;
