import * as dotenv from "dotenv";
dotenv.config({
    path: ".env.local",
});
export default {
    driver: "pg",
    out: "./drizzle",
    schema: "./src/db/schema.js",
    dbCredentials: {
        connectionString: process.env.POSTGRES_CONNECTIONSTRING,
    },
};
//# sourceMappingURL=drizzle.config.js.map