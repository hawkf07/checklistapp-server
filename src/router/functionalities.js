var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
const router = Router();
router.get("/", (req, res) => {
    res.send({
        message: "root",
    });
});
// add notes
router.post("/add_notes", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { }));
//get notes
router.get("/get_notes", (req, res, next) => {
    const note = db.select().from(users);
    res.status(200).send({
        message: "user is authenticated",
    });
});
//delete notes
router.delete("/delete_notes", (req, res, next) => { });
// update notes
router.patch("/update_notes", (req, res, next) => { });
// add todos
router.post("/add_todos", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    try {
        const notes = yield db.insert(users).values(req.body);
    }
    catch (error) {
        res.status(400).json({ error });
    }
}));
//get todos
router.get("/get_todos", (req, res, next) => { });
//delete todos
router.delete("/delete_todos", (req, res, next) => { });
// update todos
router.patch("/update_todos", (req, res, next) => { });
export default router;
//# sourceMappingURL=functionalities.js.map