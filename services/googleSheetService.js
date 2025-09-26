const { google } = require("googleapis");
const path = require("path");

const KEYFILEPATH = path.join(__dirname, "../credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

/**
 * Append data into Google Sheet
 * @param {string} sheetName
 * @param {Array} values
 */
async function appendRow(sheetName, values) {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:Z`, // Dynamic range
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [values],
      },
    });
    console.log(`✅ Row added to ${sheetName}`);
  } catch (err) {
    console.error("❌ Google Sheets Error:", err.message);
    throw err;
  }
}

module.exports = { appendRow };
