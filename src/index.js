import express from "express";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

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
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

app.post("/login", async (req, res, next) => {
  const { username, email, password } = req.body;
  const allUsers = await getUser(username || email);
  const user = allUsers[0];
  console.log(user);
  if (!user) {
    res.send("No user founded");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.send("Password not match!");
  }

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true });
  res.status(200).send({ message: "successfully login" });
});

app.post("/add", isAuthJWT, (req, res, next) => {
  try {
    res.send({ message: "The Token is Valid!" });
  } catch (err) {
    res.send({ message: "Error " + err });
  }
});
app.post("/signup", async (req, res, next) => {
  const { email, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
      username,
    })
    .then((value) => res.send(value))
    .catch((error) => res.send(error));
});

app.post("/logout", (req, res, next) => {
  res.send("Handle logout");
});

app.get("/", (req, res, next) => {
  res.send({ message: "hello from fikri" });
});

app.listen(5000, () => console.log("listening on port", 5000));
