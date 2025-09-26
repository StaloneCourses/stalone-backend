const express = require("express");
const { submitConsultation } = require("../controllers/consultationController");

const router = express.Router();

// POST → Consultation form submit
// Endpoint: POST http://localhost:5000/api/consultation
router.post("/", submitConsultation);

module.exports = router;
