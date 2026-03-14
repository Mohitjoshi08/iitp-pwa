'use server'
import { appendSheetData, getSheetData } from '../../lib/google-sheets';

export async function submitComplaint(formData: FormData, deviceId: string) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const contact = formData.get('contact') as string;           // NEW: get contact number
  const imageUrl = formData.get('imageUrl') as string || '';

  const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

  // Now saving contact number in column D, so columns are:
  // [timestamp, title, description, contact, imageUrl, status, deviceId]
  // So the sheet range must go A:G (7 columns)
  const success = await appendSheetData('Complaints!A:G', [
    [timestamp, title, description, contact, imageUrl, 'Pending', deviceId]
  ]);

  return { success };
}

export async function getComplaints(deviceId: string) {
  if (!deviceId) return [];
  
  // Now columns are up to G so grab all data
  const data = await getSheetData('Complaints!A2:G');

  // FILTER: Only keep rows where Column G (index 6) matches the user's Device ID
  const userComplaints = data.filter(row => row[6] === deviceId);

  // Reverse so newest is on top
  return userComplaints.reverse();
}