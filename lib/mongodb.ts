import { MongoClient, ServerApiVersion } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & { mongoClient?: MongoClient };

export async function getDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI não configurada.");
  const client = globalForMongo.mongoClient ?? new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
  });
  if (process.env.NODE_ENV !== "production") globalForMongo.mongoClient = client;
  await client.connect();
  return client.db(process.env.MONGODB_DB || "galaxy_store");
}
