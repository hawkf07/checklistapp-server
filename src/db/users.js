import {
  PgSerial,
  PgText,
  PgVarchar,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  name: varchar("name", { length: 256 }),
  id: serial("id").notNull().primaryKey(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: text("password").notNull(),
});
