import { config } from "https://deno.land/x/dotenv/mod.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

const client = new MongoClient();

client.connectWithUri(config().DB_SERVER);

const db = client.database(config().DB_NAME);

export default db;
