const express = require("express");
const { createExcel } = require("../controllers/excelController");
const router = express.Router();

router.get("/create", createExcel);

module.exports = router;
