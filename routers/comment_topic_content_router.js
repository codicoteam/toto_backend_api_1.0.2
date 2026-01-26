const express = require("express");
const router = express.Router();
const commentTopicContentController = require("../controllers/comment_topic_content_controller");

/**
 * @swagger
 * tags:
 *   name: CommentTopic
 *   description: CommentTopic management endpoints
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
 * /api/v1/commenttopic:
 *   get:
 *     tags:
 *       - CommentTopic
 *     summary: Get all CommentTopic records
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
router.get("/", authenticateToken, commentTopicContentController.getAll);

/**
 * @swagger
 * /api/v1/commenttopic/{id}:
 *   get:
 *     tags:
 *       - CommentTopic
 *     summary: Get CommentTopic by ID
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
router.get("/:id", authenticateToken, commentTopicContentController.getById);

/**
 * @swagger
 * /api/v1/commenttopic:
 *   post:
 *     tags:
 *       - CommentTopic
 *     summary: Create new CommentTopic
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
router.post("/", authenticateToken, commentTopicContentController.create);

/**
 * @swagger
 * /api/v1/commenttopic/{id}:
 *   put:
 *     tags:
 *       - CommentTopic
 *     summary: Update CommentTopic
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
router.put("/:id", authenticateToken, commentTopicContentController.update);

/**
 * @swagger
 * /api/v1/commenttopic/{id}:
 *   delete:
 *     tags:
 *       - CommentTopic
 *     summary: Delete CommentTopic
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
router.delete("/:id", authenticateToken, commentTopicContentController.delete);

module.exports = router;
