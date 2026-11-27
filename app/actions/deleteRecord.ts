'use server';
import { ObjectId } from 'mongodb';
import { getRecordCollection } from '@/lib/db';
import { LOCAL_USER_ID } from '@/lib/localUser';
import { revalidatePath } from 'next/cache';

async function deleteRecord(recordId: string): Promise<{
  message?: string;
  error?: string;
}> {
  if (!ObjectId.isValid(recordId)) {
    return { error: 'Invalid expense ID' };
  }

  try {
    const collection = await getRecordCollection();
    const result = await collection.deleteOne({
      _id: new ObjectId(recordId),
      userId: LOCAL_USER_ID,
    });

    if (result.deletedCount === 0) {
      return { error: 'Expense not found' };
    }

    revalidatePath('/');

    return { message: 'Record deleted' };
  } catch (error) {
    console.error('Error deleting record:', error); // Log the error
    return { error: 'Database error' };
  }
}

export default deleteRecord;
