import { Router } from "express";
import {
  getAllNotes,
  createNotes,
  updateNotes,
  destroy,
} from "../controllers/note.controller.js";

const router = Router();

router.get("/", getAllNotes);
router.post("/", createNotes);
router.patch("/:id", updateNotes);
router.delete("/:id", destroy);

export default router;
