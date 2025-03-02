import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import twilio from "twilio";
import Appointment from "./models/Appointment.js";
import ConsentForm from "./models/ConsentForm.js";
import walkInRoutes from "./routes/walkin.js"; // Import Walk-in Routes
import WalkIn from "./models/WalkIn.js";  // Correct path inside backend

app.use("/walkin", walkInRoutes); // Mount walk-in routes

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// 🔌 MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Twilio Setup
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// -----------------------------------
// 🗓️ Appointment API
// -----------------------------------

// 📌 Create a new appointment
app.post("/appointments", async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        res.status(500).json({ error: "Error creating appointment", details: err });
    }
});

// 📌 Get all appointments
app.get("/appointments", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: "Error fetching appointments" });
    }
});

// 📌 Get a single appointment
app.get("/appointments/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ error: "Appointment not found" });
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ error: "Error fetching appointment" });
    }
});

// 📌 Update an appointment
app.put("/appointments/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ error: "Error updating appointment" });
    }
});

// 📌 Delete an appointment
app.delete("/appointments/:id", async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "Appointment deleted" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting appointment" });
    }
});

// -----------------------------------
// 📩 Twilio Messaging API
// -----------------------------------

// 📌 Send an SMS Reminder
app.post("/send-sms", async (req, res) => {
    try {
        const { phone, message } = req.body;
        if (!phone || !message) return res.status(400).json({ error: "Phone and message are required" });

        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        });

        res.json({ message: "SMS Sent" });
    } catch (err) {
        res.status(500).json({ error: "Error sending SMS", details: err });
    }
});

// -----------------------------------
// 📜 Owner Consent API
// -----------------------------------

// 📌 Submit Consent Form
app.post("/consent-form", async (req, res) => {
    try {
        const consent = new ConsentForm(req.body);
        await consent.save();
        res.status(201).json(consent);
    } catch (err) {
        res.status(500).json({ error: "Error submitting consent form" });
    }
});

// 📌 Get Consent Form by ID
app.get("/consent-form/:id", async (req, res) => {
    try {
        const consent = await ConsentForm.findById(req.params.id);
        if (!consent) return res.status(404).json({ error: "Consent form not found" });
        res.json(consent);
    } catch (err) {
        res.status(500).json({ error: "Error retrieving consent form" });
    }
});

// -----------------------------------
// 🚀 Start the Server
// -----------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

