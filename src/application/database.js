import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connect");
  } catch (error) {
    console.log("Error connect", error.message);
    process.exit(1);
  }
}
