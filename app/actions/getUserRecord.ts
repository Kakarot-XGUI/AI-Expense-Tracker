'use server';
import { getRecordCollection } from '@/lib/db';
import { LOCAL_USER_ID } from '@/lib/localUser';

async function getUserRecord(): Promise<{
  record?: number;
  daysWithRecords?: number;
  error?: string;
}> {
  try {
    const collection = await getRecordCollection();
    const records = await collection
      .find({ userId: LOCAL_USER_ID }, { projection: { amount: 1 } })
      .toArray();

    const record = records.reduce((sum, record) => sum + record.amount, 0);

    // Count the number of days with valid sleep records
    const daysWithRecords = records.filter(
      (record) => record.amount > 0
    ).length;

    return { record, daysWithRecords };
  } catch (error) {
    console.error('Error fetching user record:', error); // Log the error
    return { error: 'Database error' };
  }
}

export default getUserRecord;
