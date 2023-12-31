import { users } from "../db/schema.js";
import jwt from "jsonwebtoken";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";

export const getUser = async (input) => {
  const user = db
    .select()
    .from(users)
    .where(eq(users.username || users.email, input));
  return user;
};

export const isAuthJWT = (req, res, next) => {
  const cookie = req.cookies;
  try {
    const token = req.cookies.token;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    console.log(error);
    console.log(JSON.stringify(cookie), "is cookies");

    res.send({ message: "error user is not authenticated", error });
  }
};
