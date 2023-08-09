import express from "express";
import router from "./router/authRouter";
const app = express();

app.use(express.urlencoded());
app.get("/", (req, res, next) => {
  res.send({ message: "hello from fikri" });
});

app.use("/auth", router);
app.listen(5000, () => console.log("listening on port", 5000));
