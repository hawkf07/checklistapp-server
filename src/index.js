import express from "express";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";

import { db } from "./db/index.js";
import { users } from "./db/schema.js";
import bodyParser from "body-parser";
import { eq } from "drizzle-orm";

const getUser = async (input) => {
  const user = db
    .select()
    .from(users)
    .where(eq(users.username || users.email, input));
  return user;
};

const isAuthJWT = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    res.redirect("/login");
  }
};

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

app.post("/login", async (req, res, next) => {
  const { username, email, password } = req.body;
  const allUsers = await getUser(username || email);

  const user = allUsers[0];
  if (user == undefined) {
    res.send("No user founded");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.send({ message: "password not match" });
  }

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  res
    .cookie("token", token, { httpOnly: false, maxAge: 1000 * 60 * 10 })
    .send("cookie send!");
});

app.get("/add", isAuthJWT, (req, res, next) => {
  try {
    res.send({ message: "The Token is Valid!" });
  } catch (err) {
    res.send({ message: "Error " + err });
  }
});
app.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body, " is body");
    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        username,
      })
      .then((value) =>
        res.status(200).send({ message: "user successfully created" })
      )
      .catch((error) => res.send(error));
  } catch (error) {
    return res.status(400).json(error);
  }
});

app.post("/logout", (req, res, next) => {
  res.send("Handle logout");
});

app.get("/", (req, res, next) => {
  res.send({ message: "hello from fikri" });
});

app.listen(5000, () => console.log("listening on port", 5000));
