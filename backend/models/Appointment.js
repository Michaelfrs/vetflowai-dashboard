import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    petName: { type: String, required: true },
    ownerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    reason: { type: String },
    status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Appointment", AppointmentSchema);
