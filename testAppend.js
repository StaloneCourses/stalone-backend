const { google } = require("googleapis");
require("dotenv").config();

async function testAppend() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Enrollments!A:F", // Sheet tab name + range
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [["Test User", "test@gmail.com", "1234567890", "Node.js Course", "Testing append", new Date().toLocaleString()]],
      },
    });

    console.log("✅ Row added:", result.status);
  } catch (err) {
    console.error("❌ Append failed:", err.message);
  }
}

testAppend();
