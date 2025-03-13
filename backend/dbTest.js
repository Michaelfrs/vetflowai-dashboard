import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("❌ MongoDB URI is missing from environment variables!");
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB!");
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        // Instead of exiting, throw an error so it can be handled by the app
        throw new Error("Database connection failed.");
    });
