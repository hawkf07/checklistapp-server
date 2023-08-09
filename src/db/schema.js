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
  username: varchar("name", { length: 256 }).notNull(),
  id: serial("id").notNull().primaryKey(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: text("password").notNull(),
});
