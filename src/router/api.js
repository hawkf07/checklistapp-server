import { getUser, isAuthJWT } from "../utils/index.js";
import { Router } from "express";
const router = Router();
import bcrypt from "bcrypt";

router.post("/login", async (req, res, next) => {
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

router.post("/signup", async (req, res, next) => {
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

router.post("/logout", (req, res, next) => {
  res.send("Handle logout");
});
export { router };
