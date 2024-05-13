import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: String,
    duration: {
        type: String,
        required: true,
    },
    master: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Master',
    }]
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
