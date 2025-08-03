import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`\n✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("\n❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};
