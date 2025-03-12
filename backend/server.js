import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import twilio from "twilio";

import walkInRoutes from "./routes/walkin.js";
import Appointment from "./models/Appointment.js";
import ConsentForm from "./models/ConsentForm.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

app.use("/api/walkins", walkInRoutes);

// ✅ Add a global error handler for unexpected errors
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// Twilio Setup
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// --------------------------
// 🏥 Walk-in Routes
// --------------------------
app.use("/api/walkins", walkInRoutes);

// --------------------------
// 🗓️ Appointment API
// --------------------------

// 📌 Create a new appointment
app.post("/api/appointments", async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        res.status(500).json({ error: "Error creating appointment", details: err });
    }
});

// 📌 Get all appointments
app.get("/api/appointments", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: "Error fetching appointments" });
    }
});

// 📌 Get a single appointment
app.get("/api/appointments/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ error: "Appointment not found" });
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ error: "Error fetching appointment" });
    }
});

// 📌 Update an appointment
app.put("/api/appointments/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ error: "Error updating appointment" });
    }
});

// 📌 Delete an appointment
app.delete("/api/appointments/:id", async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "Appointment deleted" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting appointment" });
    }
});

// --------------------------
// 📩 Twilio Messaging API
// --------------------------

// 📌 Send an SMS Reminder
app.post("/api/send-sms", async (req, res) => {
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

// --------------------------
// 📜 Owner Consent API
// --------------------------

// 📌 Submit Consent Form
app.post("/api/consent-form", async (req, res) => {
    try {
        const consent = new ConsentForm(req.body);
        await consent.save();
        res.status(201).json(consent);
    } catch (err) {
        res.status(500).json({ error: "Error submitting consent form" });
    }
});

// 📌 Get Consent Form by ID
app.get("/api/consent-form/:id", async (req, res) => {
    try {
        const consent = await ConsentForm.findById(req.params.id);
        if (!consent) return res.status(404).json({ error: "Consent form not found" });
        res.json(consent);
    } catch (err) {
        res.status(500).json({ error: "Error retrieving consent form" });
    }
});

// --------------------------
// 🔄 Root Route for API
// --------------------------
app.get("/", (req, res) => {
    res.send("VetFlowAI Backend is Running ✅");
});

// --------------------------
// 🚀 Start the Server
// --------------------------
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
