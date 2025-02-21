import mongoose from "mongoose";

const ConsentFormSchema = new mongoose.Schema({
    petName: { type: String, required: true },
    ownerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    procedure: { type: String, required: true },
    consentGiven: { type: Boolean, required: true },
    signature: { type: String, required: true }, // Store base64-encoded signature
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ConsentForm", ConsentFormSchema);
