const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", require("./routes/submitRoutes"));

// Health check (optional but useful)
app.get("/", (req, res) => {
  res.send("Backend API running");
});

module.exports = app;
