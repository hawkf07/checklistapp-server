import { getUser, isAuthJWT } from "../utils/index.js";
import { Router } from "express";
import jwt from "jsonwebtoken";
const router = Router();
import bcrypt from "bcrypt";
import { users } from "../db/schema.js";
import { db } from "../db/index.js";

router.post("/login", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const allUsers = await getUser(username || email);

    const user = allUsers[0];
    if (!user) {
      res.status(400).send("No user found!");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.send({ message: "password not match" });
    }
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
    res
      .cookie("token", token, { httpOnly: false, maxAge: 1000 * 60 * 10 })
      .send({
        message: "Login Successfully",
        status: 200,
        id: user.id,
      });
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .insert(users)
      .values({
        password: hashedPassword,
        username,
        email,
      })
      .then((value) =>
        res
          .status(200)
          .send({ message: "user successfully created", status: 200 })
      )
      .catch((error) => res.send(error));
  } catch (error) {
    console.log(error.detail);
    return res.status(400).json({ error, detail: error.detail });
  }
});

router.post("/logout", (req, res, next) => {
  res.clearCookie("token");
});
export default router;
