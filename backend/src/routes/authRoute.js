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
 *  /auth/register:
 *    post:
 *      tags:
 *        - Auth Register
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: admin noteme
 *                email:
 *                  type: string
 *                  example: admin@mail.com
 *                phone:
 *                  type: string
 *                  example: 08213121131
 *                password:
 *                  type: string
 *                  example: 1234
 *      responses:
 *        '200':
 *          description: Registered Successfully
 *        '404':
 *          description: Email is already registered
 *        '401':
 *          description: Invalid email or password
 */
router.post("/register", register);

/**
 * @openapi
 * /auth/login:
 *  post:
 *    tags:
 *      - Auth Login
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: Login Successfully
 *      '404':
 *        description: Email or Password is required
 *      '401':
 *        description: Invalid email or password
 */
router.post("/login", login);
router.get("/", getAllUser);
router.delete("/:id", destroy);

// router.post("/:id/picture", uploadMiddleware("image"), upload);

export default router;
