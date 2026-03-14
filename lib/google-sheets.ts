import { google } from 'googleapis';

const getAuth = () => {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: privateKey,
    },
    // Removed .readonly so we can write to the sheet
    scopes: ['https://www.googleapis.com/auth/spreadsheets'], 
  });
};

export async function getSheetData(range: string) {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: range,
    });
    return response.data.values || [];
  } catch (error) {
    console.error("Google Sheets Read Error:", error);
    return [];
  }
}

export async function appendSheetData(range: string, values: any[][]) {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });
    return true;
  } catch (error) {
    console.error("Google Sheets Write Error:", error);
    return false;
  }
}