import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoutes.js";

const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((error) => console.log("❌ MongoDB Connection Error:", error));

// Register routes before starting the server
app.use("/api", route);

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
