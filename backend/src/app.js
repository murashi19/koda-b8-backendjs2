import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Route Testing
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to NoteMe API",
  });
});

export default app;
