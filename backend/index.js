

import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";

const PORT = 8000;
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Server is running! Welcome to the API base route.");
});

// 🔥 Global error middleware
app.use((err, req, res, next) => {
  console.error(" Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// 🔥 Safe startup with error catching
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(` Server running on port ${PORT}`);
  } catch (err) {
    console.error(" Error starting server:", err.message);
  }
});
