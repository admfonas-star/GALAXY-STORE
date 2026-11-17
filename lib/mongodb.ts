import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Defina MONGODB_URI no ambiente do servidor.");

const globalForMongo = globalThis as typeof globalThis & { mongoClient?: MongoClient };
const client = globalForMongo.mongoClient ?? new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});
if (process.env.NODE_ENV !== "production") globalForMongo.mongoClient = client;

export async function getDatabase() {
  await client.connect();
  return client.db(process.env.MONGODB_DB || "galaxy_store");
}
