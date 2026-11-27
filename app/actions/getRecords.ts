'use server';
import { getRecordCollection } from '@/lib/db';
import { LOCAL_USER_ID } from '@/lib/localUser';
import { Record } from '@/types/Record';

async function getRecords(): Promise<{
  records?: Record[];
  error?: string;
}> {
  try {
    const collection = await getRecordCollection();
    const documents = await collection
      .find({ userId: LOCAL_USER_ID })
      .sort({ date: -1 })
      .limit(10)
      .toArray();
    const records = documents.map(({ _id, ...record }) => ({
      ...record,
      id: _id.toString(),
    }));

    return { records };
  } catch (error) {
    console.error('Error fetching records:', error); // Log the error
    return { error: 'Database error' };
  }
}

export default getRecords;
