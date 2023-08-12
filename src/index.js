import express from "express";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";

import { db } from "./db/index.js";
import { users } from "./db/schema.js";
import bodyParser from "body-parser";
import { eq } from "drizzle-orm";
import { router } from "./router/api.js";
import functionsRouter from "./router/functionalities.js";
import { isAuthJWT } from "./utils/index.js";
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api", router);
app.use("/api", isAuthJWT, functionsRouter);
app.get("/", (req, res, next) => {
  res.send({ message: "hello from fikri" });
});

app.listen(5000, () => console.log("listening on port", 5000));
