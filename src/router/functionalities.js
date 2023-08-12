import { Router } from "express";

const router = Router();

// add notes
router.post("/add_notes", (req, res, next) => {});
//get notes
router.get("/get_notes", (req, res, next) => {
  res.status(200).send({
    id: req.user.id,
  });
});
//delete notes
router.delete("/delete_notes", (req, res, next) => {});
// update notes
router.patch("/update_notes", (req, res, next) => {});
// add todos
router.post("/add_todos", (req, res, next) => {});
//get todos
router.get("/get_todos", (req, res, next) => {});
//delete todos
router.delete("/delete_todos", (req, res, next) => {});
// update todos
router.patch("/update_todos", (req, res, next) => {});
export default router;
