const express = require("express");
const router = express.Router();
const chatController = require("../controllers/teacher_student_chat_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: TeacherStudentChat
 *   description: Teacher-student chat
 */

/**
 * @swagger
 * /api/v1/teacher-student-chat/create:
 *   post:
 *     tags: [TeacherStudentChat]
 *     summary: Create chat message
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senderId
 *               - receiverId
 *               - message
 *             properties:
 *               senderId:
 *                 type: string
 *               receiverId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent
 */
router.post("/create", authenticateToken, chatController.createMessage);

/**
 * @swagger
 * /api/v1/teacher-student-chat/conversation/{userId1}/{userId2}:
 *   get:
 *     tags: [TeacherStudentChat]
 *     summary: Get conversation between two users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId1
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId2
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conversation history
 */
router.get("/conversation/:userId1/:userId2", authenticateToken, chatController.getConversation);

/**
 * @swagger
 * /api/v1/teacher-student-chat/user/{userId}:
 *   get:
 *     tags: [TeacherStudentChat]
 *     summary: Get all chats for a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's chats
 */
router.get("/user/:userId", authenticateToken, chatController.getUserChats);

/**
 * @swagger
 * /api/v1/teacher-student-chat/message/{messageId}:
 *   delete:
 *     tags: [TeacherStudentChat]
 *     summary: Delete message
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message deleted
 */
router.delete("/message/:messageId", authenticateToken, chatController.deleteMessage);

module.exports = router;
