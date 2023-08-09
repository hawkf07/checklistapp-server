import { Router } from "express";
import bcyrpt from "bcrypt";
import { db } from "../db";
import { users } from "../db/schema";

const router = Router();

router.post("/login", (req, res, next) => {
  res.send("Handle Login");
});
router.post("/signup", (req, res, next) => {
  const { email, username, password } = req.body;

  const hashedPassword = bcyrpt.hash(password, 12, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Error hashing password" + err });
    }
    db.insert(users).values({
      email,
      password: hashedPassword,
      username,
    });
    return res.status(200).json({ message: "user successfully registered" });
  });

  res.send("Handle Signup");
});

router.post("/logout", (req, res, next) => {
  res.send("Handle logout");
});

export default router;
