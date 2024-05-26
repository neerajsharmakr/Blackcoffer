// server.js

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dataRoutes from "./routes/dataRoutes.js";
import { initData } from "./models/dataModel.js";
import cors from "cors";

const app = express();

// Connect to MongoDB

mongoose.connect(
  "mongodb+srv://neerajsharmanitc:oRwep0g8DIn5ZQc9@cluster0.4wmj7fw.mongodb.net/"
);

// Dumping data into mongo if not exist
initData();

// Middleware
app.use(bodyParser.json());
app.use(cors("*")); // Enable CORS for all routes

// Routes
app.use("/api", dataRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
