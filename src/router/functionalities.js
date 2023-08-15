import { Router } from "express";
import { db } from "../db/index.js";
import { todos, users } from "../db/schema.js";

const router = Router();

router.get("/", (req, res) => {
  res.send({
    message: "root",
  });
});
// add notes
router.post("/add_notes", async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const notes = await db.insert(users).values(req.body);
  } catch (error) {
    res.status(400).json({ error });
  }
});
//get notes
router.get("/get_notes", (req, res, next) => {
  res.status(200).send({
    message: "user is authenticated",
  });
});
//delete notes
router.delete("/delete_notes", (req, res, next) => { });
// update notes
router.patch("/update_notes", (req, res, next) => { });
// add todos
router.post("/add_todos", (req, res, next) => { });
//get todos
router.get("/get_todos", (req, res, next) => { });
//delete todos
router.delete("/delete_todos", (req, res, next) => { });
// update todos
router.patch("/update_todos", (req, res, next) => { });
export default router;
