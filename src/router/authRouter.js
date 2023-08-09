import { Router } from "express";

const router = Router();

router.post("/login", (req, res, next) => {
  res.send("Handle Login");
});
router.post("/signup", (req, res, next) => {
  res.send("Handle Signup");
});

router.post("/logout", (req, res, next) => {
  res.send("Handle logout");
});
