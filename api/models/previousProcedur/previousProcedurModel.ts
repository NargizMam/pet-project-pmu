import mongoose from "mongoose";

const previousProcedureSchema = new mongoose.Schema({
    type: { type: String },
    date: { type: Date },
    notes: { type: String },
    photos: [{ type: String}],
});

export default mongoose.model('PreviousProcedure', previousProcedureSchema);
