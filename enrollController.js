const { appendRow } = require("../services/googleSheetService");

const enrollCourse = async (req, res) => {
  try {
    console.log("📥 Enrollment data received:", req.body);
    const { name, email, phone, course, message } = req.body;

    if (!name || !email || !phone || !course) {
      return res.status(400).json({ message: "All fields are required ❌" });
    }

    await appendRow("Enrollments", [
      name,
      email,
      phone,
      course,
      message || "",
      new Date().toLocaleString(),
    ]);

    res.json({ message: "✅ Enrollment saved successfully" });
  } catch (error) {
    console.error("❌ Error saving enrollment:", error);
    res.status(500).json({ message: "Error saving enrollment ❌" });
  }
};

// ✅ Correct export
module.exports = { enrollCourse };
