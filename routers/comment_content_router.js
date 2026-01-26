const express = require("express");
const router = express.Router();
const commentContentController = require("../controllers/comment_content_controller");

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Comment management endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const { authenticateToken } = require("../middlewares/auth");

// Basic CRUD routes

/**
 * @swagger
 * /api/v1/comment:
 *   get:
 *     tags:
 *       - Comment
 *     summary: Get all Comment records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/", authenticateToken, commentContentController.getAll);

/**
 * @swagger
 * /api/v1/comment/{id}:
 *   get:
 *     tags:
 *       - Comment
 *     summary: Get Comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.get("/:id", authenticateToken, commentContentController.getById);

/**
 * @swagger
 * /api/v1/comment:
 *   post:
 *     tags:
 *       - Comment
 *     summary: Create new Comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/", authenticateToken, commentContentController.create);

/**
 * @swagger
 * /api/v1/comment/{id}:
 *   put:
 *     tags:
 *       - Comment
 *     summary: Update Comment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.put("/:id", authenticateToken, commentContentController.update);

/**
 * @swagger
 * /api/v1/comment/{id}:
 *   delete:
 *     tags:
 *       - Comment
 *     summary: Delete Comment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.delete("/:id", authenticateToken, commentContentController.delete);

module.exports = router;
