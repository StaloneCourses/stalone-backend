const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const enrollRoutes = require("./routes/enrollRoutes");
app.use("/api", enrollRoutes);

const consultationRoutes = require("./routes/consultationRoutes");
app.use("/api/consultation", consultationRoutes);

// Serve static frontend files from /public
app.use(express.static(path.join(__dirname, "public")));

// Fallback → only for unknown routes (skip assets)
app.get("*", (req, res, next) => {
  if (
    req.path.includes(".html") ||
    req.path.includes(".css") ||
    req.path.includes(".js") ||
    req.path.includes(".ico")
  ) {
    return next(); // let static files serve properly
  }
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

