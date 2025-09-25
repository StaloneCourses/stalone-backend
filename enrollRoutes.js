const express = require("express");
const router = express.Router();
const { enrollCourse } = require("../controllers/enrollController");

// ✅ make sure callback is defined
router.post("/enrollments", enrollCourse);

module.exports = router;
