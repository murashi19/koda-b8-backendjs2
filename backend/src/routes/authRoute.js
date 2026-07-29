import express from "express";
import { getAllUser, login, register } from "../controllers/auth.controller.js";
// import uploadMiddleware from "../middlewares/upload.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/", getAllUser);

// router.post("/:id/picture", uploadMiddleware("image"), upload);

export default router;
