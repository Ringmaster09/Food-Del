import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

// 🧪 Debug print
console.log("🔍 MONGO_URI from .env:", process.env.MONGO_URI);

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
