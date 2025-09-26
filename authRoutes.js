const express = require("express");
const { signup, login, forgotPassword, resetPassword } = require("../controllers/authController");
const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Forgot password route
router.post("/forgot-password", forgotPassword);

// Reset password route - changed to PUT for update semantics
router.put("/reset-password/:token", resetPassword);

module.exports = router;
