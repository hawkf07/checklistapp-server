CREATE TABLE IF NOT EXISTS "users" (
	"name" varchar(256),
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
