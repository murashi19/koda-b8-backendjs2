import express from "express";
import { getAllUser, login, register } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.js";
// import uploadMiddleware from "../middlewares/upload.js";

const router = express.Router();
router.use(authMiddleware);
// router.use(authMiddleware);
router.post("/register", register);
router.post("/login", login);
router.get("/", getAllUser);

// router.post("/:id/picture", uploadMiddleware("image"), upload);

export default router;
