import { users } from "../db/schema.js";

export const getUser = async (input) => {
  const user = db
    .select()
    .from(users)
    .where(eq(users.username || users.email, input));
  return user;
};

export const isAuthJWT = (req, res, next) => {
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
