const ExcelJS = require("exceljs");
const path = require("path");

exports.createExcel = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Enrollments");

    // Headers
    sheet.addRow(["Name", "Email", "Course", "Date"]);

    // Sample Data (later DB la irundhu fetch pannanum)
    sheet.addRow(["Suriya", "suriya@gmail.com", "AI for Business", new Date().toLocaleDateString()]);
    sheet.addRow(["Arun", "arun@gmail.com", "Digital Marketing", new Date().toLocaleDateString()]);

    const filePath = path.join(__dirname, "../data/enrollments.xlsx");
    await workbook.xlsx.writeFile(filePath);

    res.json({ message: "Excel file created successfully!", file: filePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating Excel file" });
  }
};
