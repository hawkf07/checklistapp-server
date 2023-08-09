import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const client = new Pool(process.env.POSTGRES_CONNECTIONSTRING);

export const db = drizzle(client);
