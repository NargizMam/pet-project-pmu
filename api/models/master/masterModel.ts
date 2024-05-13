import mongoose from "mongoose";

const masterSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
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

const Master = mongoose.model('Master', masterSchema);

export default Master;