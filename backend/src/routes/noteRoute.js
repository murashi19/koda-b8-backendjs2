import { Router } from "express";
import {
  getAllNotes,
  createNotes,
  updateNotes,
  destroy,
} from "../controllers/note.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", authMiddleware, getAllNotes);
router.post("/", authMiddleware, createNotes);
router.patch("/:id", authMiddleware, updateNotes);
router.delete("/:id", authMiddleware, destroy);

export default router;
