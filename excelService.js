const { google } = require("googleapis");
const path = require("path");

// ✅ Load credentials
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// ----------------- SAVE ENROLLMENT -----------------
async function saveEnrollments(data) {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Enrollments!A1", // tab name → Enrollments
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          data.name || "",
          data.email || "",
          data.phone || "",
          data.course || "",
          data.message || "",
          new Date().toLocaleString()
        ]]
      }
    });
    console.log("✅ Enrollment saved to Google Sheets");
  } catch (err) {
    console.error("❌ Error saving enrollment:", err.message);
  }
}

// ----------------- SAVE CONSULTATION -----------------
async function saveConsultation(data) {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Consultations!A1", // tab name → Consultations
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          data.name || "",
          data.mobile || "",
          data.email || "",
          data.course || "",
          data.location || "",
          data.communication || "",
          data.message || "",
          new Date().toLocaleString()
        ]]
      }
    });
    console.log("✅ Consultation saved to Google Sheets");
  } catch (err) {
    console.error("❌ Error saving consultation:", err.message);
  }
}

module.exports = { saveEnrollment, saveConsultation };
