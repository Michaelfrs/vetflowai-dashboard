import express from "express";
import WalkIn from "../models/WalkIn.js";

const router = express.Router();

// Create a Walk-in Entry
router.post("/", async (req, res) => {
    try {
        const walkIn = new WalkIn(req.body);
        await walkIn.save();
        res.status(201).json({ message: "Walk-in added successfully", walkIn });
    } catch (err) {
        res.status(500).json({ error: "Failed to add walk-in", details: err });
    }
});

// Get all Walk-ins
router.get("/", async (req, res) => {
    try {
        const walkIns = await WalkIn.find();
        res.json(walkIns);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch walk-ins", details: err });
    }
});

export default router;
