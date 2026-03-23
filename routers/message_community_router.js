const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message_community_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: MessageCommunity
 *   description: Community messages
 */

/**
 * @swagger
 * /api/v1/message-community:
 *   get:
 *     tags: [MessageCommunity]
 *     summary: Get all messages
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of messages
 */
router.get("/", authenticateToken, messageController.getAllMessages);

/**
 * @swagger
 * /api/v1/message-community/{id}:
 *   get:
 *     tags: [MessageCommunity]
 *     summary: Get message by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message details
 */
router.get("/:id", authenticateToken, messageController.getMessageById);

/**
 * @swagger
 * /api/v1/message-community:
 *   post:
 *     tags: [MessageCommunity]
 *     summary: Create message
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - communityId
 *               - senderId
 *               - senderType
 *               - content
 *             properties:
 *               communityId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *                 description: Community ID (required)
 *               senderId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c86"
 *                 description: Sender user ID (required)
 *               senderType:
 *                 type: string
 *                 enum: [student, teacher, admin]
 *                 example: "student"
 *                 description: Type of sender (required)
 *               content:
 *                 type: string
 *                 example: "Hello everyone! Welcome to the community."
 *                 description: Message content (required)
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["image1.jpg", "document.pdf"]
 *                 description: File attachments
 *     responses:
 *       201:
 *         description: Message created
 */
router.post("/", authenticateToken, messageController.createMessage);

/**
 * @swagger
 * /api/v1/message-community/community/{communityId}:
 *   get:
 *     tags: [MessageCommunity]
 *     summary: Get messages by community ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *         description: Community ID
 *     responses:
 *       200:
 *         description: Messages for community
 */
router.get("/community/:communityId", authenticateToken, messageController.getMessagesByCommunityId);

/**
 * @swagger
 * /api/v1/message-community/sender/{senderId}:
 *   get:
 *     tags: [MessageCommunity]
 *     summary: Get messages by sender ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: senderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Sender ID
 *     responses:
 *       200:
 *         description: Messages from sender
 */
router.get("/sender/:senderId", authenticateToken, messageController.getMessagesBySenderId);

/**
 * @swagger
 * /api/v1/message-community/{id}:
 *   put:
 *     tags: [MessageCommunity]
 *     summary: Update message
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Updated message content"
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Message updated
 */
router.put("/:id", authenticateToken, messageController.updateMessage);

/**
 * @swagger
 * /api/v1/message-community/{id}:
 *   delete:
 *     tags: [MessageCommunity]
 *     summary: Delete message
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message deleted
 */
router.delete("/:id", authenticateToken, messageController.deleteMessage);

module.exports = router;
