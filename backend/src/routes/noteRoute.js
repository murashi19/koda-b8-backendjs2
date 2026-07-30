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
 * /notes:
 *  get:
 *    tags:
 *      - notes
 *    summary: Return notes list
 *    description:
 *    operationId: getAllNotes
 *    responses:
 *      '200':
 *        description: Lists Notes
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            additionalProperties:
 *              type: string
 *    securty:
 *      - token: []
 */

router.get("/", getAllNotes);
router.post("/", createNotes);
router.patch("/:id", updateNotes);
router.delete("/:id", destroy);

export default router;
