import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import twilio from "twilio";

import walkInRoutes from "./routes/walkin.js";
import Appointment from "./models/Appointment.js";
import ConsentForm from "./models/ConsentForm.js";

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

// ✅ Add a global error handler for unexpected errors
app.use((err, req, res,) => {
  console.error("Unhandled Error:", err.stack || err);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// Twilio Setup
//const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

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
    } catch (error) {  
        console.error("Error fetching appointments:", error);  // ✅ Logs error for debugging
        res.status(500).json({ error: "Error fetching appointments", details: error.message });
    }
});

// 📌 Get a single appointment
app.get("/api/appointments/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ error: "Appointment not found" });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: "Error fetching appointment", details: error.message });
    }
});

// 📌 Update an appointment
app.put("/api/appointments/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ error: "Appointment not found" });

        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ error: "Error updating appointment", details: error.message });
    }
});

// 📌 Delete an appointment
app.delete("/api/appointments/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ error: "Appointment not found" });

        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "Appointment deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting appointment", details: error.message });
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
            from: twilioNumber,
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
    } catch (error) {  // ✅ Changed `err` to `error`
        console.error("Error submitting consent form:", error);  // ✅ Logs error for debugging
        res.status(500).json({ error: "Error submitting consent form", details: error.message });
    }
});

// 📌 Get Consent Form by ID
app.get("/api/consent-form/:id", async (req, res) => {
    try {
        const consent = await ConsentForm.findById(req.params.id);
        if (!consent) return res.status(404).json({ error: "Consent form not found" });

        res.json(consent);
    } catch (error) {  // ✅ Changed `err` to `error`
        console.error("Error retrieving consent form:", error);  // ✅ Logs error for debugging
        res.status(500).json({ error: "Error retrieving consent form", details: error.message });
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
