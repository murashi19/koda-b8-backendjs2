import { Router } from "express";

import {
  getAllNotes,
  createNotes,
  updateNotes,
  destroy,
} from "../controllers/note.controller.js";
import authMiddleware from "../middleware/auth.js";
const router = Router();
router.use(authMiddleware);

/**
 * @openapi
 * components:
 *   schemas:
 *     NoteInput:
 *       type: object
 *       required: [title, content]
 *       properties:
 *         title:
 *           type: string
 *           example: Belajar Swagger
 *         content:
 *           type: string
 *           example: Menulis dokumentasi API pakai OpenAPI 3
 *     Note:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         isPinned:
 *           type: boolean
 *         isArchived:
 *           type: boolean
 *         isDeleted:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @openapi
 * /notes:
 *   get:
 *     summary: Ambil semua notes milik user yang sedang login
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Daftar notes
 *       401:
 *         description: Token tidak ada / tidak valid
 *   post:
 *     summary: Buat note baru
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteInput'
 *     responses:
 *       201:
 *         description: Note berhasil dibuat
 *       400:
 *         description: title/content kosong
 */
router.get("/", getAllNotes);
router.post("/", createNotes);

/**
 * @openapi
 * /notes/{id}:
 *   patch:
 *     summary: Update note milik user yang sedang login
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteInput'
 *     responses:
 *       200:
 *         description: Note berhasil diupdate
 *       404:
 *         description: Note tidak ditemukan
 *   delete:
 *     summary: Hapus (soft delete) note milik user yang sedang login
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Note berhasil dihapus
 *       404:
 *         description: Note tidak ditemukan
 */
router.patch("/:id", updateNotes);
router.delete("/:id", destroy);

export default router;
