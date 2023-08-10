import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import dotenv from "dotenv";
const { Pool } = pg;
dotenv.config({
  path: ".env.local",
});

const client = new pg.Client(process.env.POSTGRES_CONNECTIONSTRING);
client
  .connect()
  .then((response) => console.log(`connected to the database`))
  .catch((error) => console.log(`error ${error}`));

export const db = drizzle(client);
