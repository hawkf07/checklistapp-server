import express from "express";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";

import { db } from "./db/index.js";
import { users } from "./db/schema.js";
import authRouter from "./router/api.js";
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
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/functions", isAuthJWT, functionsRouter);
app.get("/", (req, res, next) => {
  res.send({ message: "root" });
});

app.listen(5000, () => console.log("listening on port", 5000));
