const { appendRow } = require("../services/googleSheetService");

const submitConsultation = async (req, res) => {
  try {
    const { name, email, mobile, course, location, communication, message } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({ message: "All fields are required ❌" });
    }

    await appendRow("Consultations", [
      name,
      email,
      mobile,
      course || "",
      location || "",
      communication || "",
      message || "",
      new Date().toLocaleString(),
    ]);

    res.json({ message: "Consultation saved to Google Sheet ✅" });
  } catch (error) {
    console.error("Error saving consultation:", error);
    res.status(500).json({ message: "Error saving consultation ❌" });
  }
};

module.exports = { submitConsultation };
