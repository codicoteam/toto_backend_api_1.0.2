const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat management
 */

/**
 * @swagger
 * /api/v1/chat:
 *   get:
 *     tags: [Chat]
 *     summary: Get all chat records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", authenticateToken, chatController.getAll);

/**
 * @swagger
 * /api/v1/chat/{id}:
 *   get:
 *     tags: [Chat]
 *     summary: Get chat by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", authenticateToken, chatController.getById);

/**
 * @swagger
 * /api/v1/chat:
 *   post:
 *     tags: [Chat]
 *     summary: Create new chat
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
 *         description: Created successfully
 */
router.post("/", authenticateToken, chatController.create);

/**
 * @swagger
 * /api/v1/chat/{id}:
 *   put:
 *     tags: [Chat]
 *     summary: Update chat
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/:id", authenticateToken, chatController.update);

/**
 * @swagger
 * /api/v1/chat/{id}:
 *   delete:
 *     tags: [Chat]
 *     summary: Delete chat
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/:id", authenticateToken, chatController.delete);

module.exports = router;
