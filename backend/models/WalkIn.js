import mongoose from "mongoose";

const WalkInSchema = new mongoose.Schema({
    petName: { type: String, required: true },
    ownerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    checkInTime: { type: Date, default: Date.now },
    status: { type: String, enum: ["Checked In", "In Progress", "Completed"], default: "Checked In" },
    estimatedWait: { type: Number, required: true }, // Minutes
});

export default mongoose.model("WalkIn", WalkInSchema);
