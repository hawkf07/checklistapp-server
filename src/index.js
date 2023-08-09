import express from "express";
const app = express();

app.use(express.urlencoded());
app.get("/", (req, res, next) => {
  res.send({ message: "hello from fikri" });
});

app.listen(5000, () => console.log("listening on port", 5000));
