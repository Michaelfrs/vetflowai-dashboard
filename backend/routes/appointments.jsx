import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// Save a new Walk-In Appointment
router.post("/walkin", async (req, res) => {
  try {
    const { ownerName, petName, phoneNumber, reason } = req.body;

    const newAppointment = new Appointment({
      ownerName,
      petName,
      phoneNumber,
      reason,
      status: "Waiting",
      createdAt: new Date(),
    });

    await newAppointment.save();
    res.status(201).json({ message: "Walk-in appointment saved!" });
  } catch (err) {
    console.error("Error saving appointment:", err);
    res.status(500).json({ error: "Failed to save appointment" });
  }
});

export default router;
