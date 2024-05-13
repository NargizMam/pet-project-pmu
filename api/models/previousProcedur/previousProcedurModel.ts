import mongoose from "mongoose";

const previousProcedureSchema = new mongoose.Schema({
    type: { type: String },
    date: { type: Date },
    notes: { type: String },
    photos: [{ type: String}],
});

const PreviousProcedure =  mongoose.model('PreviousProcedure', previousProcedureSchema);
export default PreviousProcedure;