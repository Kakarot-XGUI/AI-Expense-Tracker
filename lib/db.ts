import { MongoClient, type Collection } from 'mongodb';

export interface ExpenseDocument {
  text: string;
  amount: number;
  category: string;
  date: Date;
  userId: string;
  createdAt: Date;
}

function getMongoUri(): string {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    throw new Error('DATABASE_URL must be set.');
  }
  return uri;
}

const uri = getMongoUri();

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

export async function getRecordCollection(): Promise<
  Collection<ExpenseDocument>
> {
  const clientPromise =
    globalForMongo.mongoClientPromise || new MongoClient(uri).connect();
  globalForMongo.mongoClientPromise = clientPromise;

  try {
    const client = await clientPromise;
    return client.db().collection<ExpenseDocument>('records');
  } catch (error) {
    delete globalForMongo.mongoClientPromise;
    throw error;
  }
}
