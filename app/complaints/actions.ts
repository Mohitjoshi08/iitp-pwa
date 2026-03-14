'use server';

import { appendSheetData } from '@/lib/google-sheets';

export async function submitComplaint(formData: FormData) {
  // Extract the specific fields from the updated form
  const name = formData.get('name') as string;
  const room = formData.get('room') as string;
  const category = formData.get('category') as string;
  const issue = formData.get('issue') as string;
  
  // Create a timestamp in IST
  const now = new Date();
  const istTime = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

  try {
    // Append the row to Google Sheets
    // Make sure your sheet is named "Complaints" and has columns for these values!
    await appendSheetData('Complaints!A:E', [
      [istTime, name, room, category, issue, "Pending"]
    ]);
    
    return { success: true };
  } catch (error) {
    console.error("Failed to submit complaint:", error);
    return { success: false, error: "Failed to save complaint to database" };
  }
}