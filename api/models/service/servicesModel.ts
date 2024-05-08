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
        type: Number,
        required: true,
    },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
