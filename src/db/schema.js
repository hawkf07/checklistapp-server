import {
  PgSerial,
  PgText,
  PgVarchar,
  boolean,
  date,
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
  date_created: date("date_created").defaultNow(),
});

// plain text todos
export const todos = pgTable("todos", {
  id: serial("id").notNull().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  date_created: date("date_created").defaultNow(),
  date_updated: date("date_updated").defaultNow(),
  completed: boolean("completed").default(false),
});

// notes with markdown
export const notes = pgTable("notes", {
  id: serial("id").notNull().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  body: text("body"),
  date_created: date("date_created").defaultNow(),
  date_updated: date("date_updated").defaultNow(),
});
