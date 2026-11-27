'use server';
import { getRecordCollection } from '@/lib/db';
import { LOCAL_USER_ID } from '@/lib/localUser';
import { revalidatePath } from 'next/cache';

interface RecordData {
  text: string;
  amount: number;
  category: string;
  date: string; // Added date field
}

interface RecordResult {
  data?: RecordData;
  error?: string;
}

async function addExpenseRecord(formData: FormData): Promise<RecordResult> {
  const textValue = formData.get('text');
  const amountValue = formData.get('amount');
  const categoryValue = formData.get('category');
  const dateValue = formData.get('date'); // Extract date from formData

  // Check for input values
  if (
    !textValue ||
    textValue === '' ||
    !amountValue ||
    !categoryValue ||
    categoryValue === '' ||
    !dateValue ||
    dateValue === ''
  ) {
    return { error: 'Text, amount, category, or date is missing' };
  }

  const text: string = textValue.toString(); // Ensure text is a string
  const amount: number = parseFloat(amountValue.toString()); // Parse amount as number
  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: 'Amount must be a positive number' };
  }
  const category: string = categoryValue.toString(); // Ensure category is a string
  // Convert date to ISO-8601 format while preserving the user's input date
  let date: Date;
  try {
    // Parse the date string (YYYY-MM-DD format) and create a date at noon UTC to avoid timezone issues
    const inputDate = dateValue.toString();
    const [year, month, day] = inputDate.split('-');
    date = new Date(
      Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), 12, 0, 0)
    );
    date.toISOString();
  } catch (error) {
    console.error('Invalid date format:', error); // Log the error
    return { error: 'Invalid date format' };
  }

  try {
    // Create a new record (allow multiple expenses per day)
    const records = await getRecordCollection();
    await records.insertOne({
      text,
      amount,
      category,
      date,
      userId: LOCAL_USER_ID,
      createdAt: new Date(),
    });

    const recordData: RecordData = {
      text,
      amount,
      category,
      date: date.toISOString(),
    };

    revalidatePath('/');

    return { data: recordData };
  } catch (error) {
    console.error('Error adding expense record:', error); // Log the error
    return {
      error: 'An unexpected error occurred while adding the expense record.',
    };
  }
}

export default addExpenseRecord;
