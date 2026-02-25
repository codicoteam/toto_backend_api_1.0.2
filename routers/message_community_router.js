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
 * /api/v1/message_community_route/create:
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
 *               - community
 *               - sender
 *               - message
 *             properties:
 *               community:
 *                 type: string
 *               sender:
 *                 type: string
 *               message:
 *                 type: string
 *               imagePath:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Message created
 */
router.post("/create", authenticateToken, messageController.createMessage);

/**
 * @swagger
 * /api/v1/message_community_route/get/{id}:
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
 *     responses:
 *       200:
 *         description: Message details
 */
router.get("/get/:id", authenticateToken, messageController.getMessageById);

/**
 * @swagger
 * /api/v1/message_community_route/community/{communityId}:
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
 *     responses:
 *       200:
 *         description: Messages for community
 */
router.get("/community/:communityId", authenticateToken, messageController.getMessagesByCommunityId);

/**
 * @swagger
 * /api/v1/message_community_route/delete/{id}:
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
 *     responses:
 *       200:
 *         description: Message deleted
 */
router.delete("/delete/:id", authenticateToken, messageController.deleteMessage);

/**
 * @swagger
 * /api/v1/message_community_route/update/{id}:
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Message updated
 */
router.put("/update/:id", authenticateToken, messageController.updateMessage);

/**
 * @swagger
 * /api/v1/message_community_route/sender/{senderId}:
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
 *     responses:
 *       200:
 *         description: Messages from sender
 */
router.get("/sender/:senderId", authenticateToken, messageController.getMessagesBySenderId);

module.exports = router;
