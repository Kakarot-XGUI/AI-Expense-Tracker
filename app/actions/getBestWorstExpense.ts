'use server';
import { getRecordCollection } from '@/lib/db';
import { LOCAL_USER_ID } from '@/lib/localUser';

async function getBestWorstExpense(): Promise<{
  bestExpense?: number;
  worstExpense?: number;
  error?: string;
}> {
  try {
    // Fetch all records for the local user
    const collection = await getRecordCollection();
    const records = await collection
      .find({ userId: LOCAL_USER_ID }, { projection: { amount: 1 } })
      .toArray();

    if (!records || records.length === 0) {
      return { bestExpense: 0, worstExpense: 0 }; // Return 0 if no records exist
    }

    const amounts = records.map((record) => record.amount);

    // Calculate best and worst expense amounts
    const bestExpense = Math.max(...amounts); // Highest amount
    const worstExpense = Math.min(...amounts); // Lowest amount

    return { bestExpense, worstExpense };
  } catch (error) {
    console.error('Error fetching expense amounts:', error); // Log the error
    return { error: 'Database error' };
  }
}

export default getBestWorstExpense;
