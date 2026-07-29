import express from "express";
import cors from "cors";
import noteRoute from "./routes/noteRoute.js";
import authRoute from "./routes/authRoute.js";
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route Testing
app.use("/notes", noteRoute);
app.use("/auth", authRoute);

export default app;
