import express from "express";
import {
  destroy,
  getAllUser,
  login,
  register,
} from "../controllers/auth.controller.js";
// import uploadMiddleware from "../middlewares/upload.js";

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterInput:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           example: rafli@gmail.com
 *         password:
 *           type: string
 *           example: secret123
 *         name:
 *           type: string
 *           example: Rafli
 *         phone:
 *           type: string
 *           example: "08213131"
 *     LoginInput:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           example: rafli@gmail.com
 *         password:
 *           type: string
 *           example: secret123
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registrasi user baru
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *       400:
 *         description: Email atau password kosong / email sudah terdaftar
 */
router.post("/register", register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login dan mendapatkan JWT token
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login berhasil, mengembalikan token JWT
 *       401:
 *         description: Email atau password salah
 */
router.post("/login", login);
router.get("/", getAllUser);
router.delete("/:id", destroy);

// router.post("/:id/picture", uploadMiddleware("image"), upload);

export default router;
