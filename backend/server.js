import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import songRouter from "./routes/songRoute.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/pinoysing", adminRouter);
app.use("/pinoysing", songRouter);

// MongoDB connection setup
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
      });
      app.listen(process.env.PORT || 3000, () => {
        console.log("Connected to MongoDB and server is running on port", process.env.PORT);
      });
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  };
  connectDB();
