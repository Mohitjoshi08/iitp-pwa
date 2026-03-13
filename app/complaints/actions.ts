'use server'
import { appendSheetData } from '../../lib/google-sheets';

export async function submitComplaint(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string || ''; // Optional field
  
  // Get current time in India (Timestamp)
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

  // Add a new row to the "Complaints" tab matching your exactly columns:
  // Timestamp | Title | Description | Image URL | Status
  const success = await appendSheetData('Complaints!A:E', [
    [timestamp, title, description, imageUrl, 'Pending']
  ]);
  
  return { success };
}