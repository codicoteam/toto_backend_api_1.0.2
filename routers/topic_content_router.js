const express = require("express");
const router = express.Router();
const topic_contentController = require("../controllers/topic_content_controller");

/**
 * @swagger
 * tags:
 *   name: TopicContent
 *   description: TopicContent management endpoints
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

// Basic routes (customize based on actual controller functions)

/**
 * @swagger
 * /api/v1/topiccontent:
 *   get:
 *     tags:
 *       - TopicContent
 *     summary: Get all TopicContent records
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
router.get("/", authenticateToken, topic_contentController.getAll || topic_contentController.getAllTopic_contents);

/**
 * @swagger
 * /api/v1/topiccontent/{id}:
 *   get:
 *     tags:
 *       - TopicContent
 *     summary: Get TopicContent by ID
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
router.get("/:id", authenticateToken, topic_contentController.getById || topic_contentController.getTopic_contentById);

/**
 * @swagger
 * /api/v1/topiccontent:
 *   post:
 *     tags:
 *       - TopicContent
 *     summary: Create new TopicContent
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
router.post("/", authenticateToken, topic_contentController.create || topic_contentController.createTopic_content);

/**
 * @swagger
 * /api/v1/topiccontent/{id}:
 *   put:
 *     tags:
 *       - TopicContent
 *     summary: Update TopicContent
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
router.put("/:id", authenticateToken, topic_contentController.update || topic_contentController.updateTopic_content);

/**
 * @swagger
 * /api/v1/topiccontent/{id}:
 *   delete:
 *     tags:
 *       - TopicContent
 *     summary: Delete TopicContent
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
router.delete("/:id", authenticateToken, topic_contentController.delete || topic_contentController.deleteTopic_content);

module.exports = router;
