import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://michael:VetFlowAINew2025@vetflowai-db.mongodb.net/vetflowai-backend?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB!");
        process.exit();
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });
