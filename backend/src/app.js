import express from "express";
import noteRoute from "./routes/noteRoute.js";
const app = express();

// Middleware
app.use(express.json());

// Route Testing
app.use("/notes", noteRoute);

export default app;
