const express = require("express");
const router = express.Router();
const teacher_student_chatController = require("../controllers/teacher_student_chat_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat management endpoints
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


/**
 * @swagger
 * /api/v1/teacher-student-chat/:
 *   get:
 *     tags: [Chat]
 *     summary: Get all Chat records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.get("/", authenticateToken, teacher_student_chatController.getAll);

/**
 * @swagger
 * /api/v1/teacher-student-chat/{id}:
 *   get:
 *     tags: [Chat]
 *     summary: Get Chat by ID
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.get("/:id", authenticateToken, teacher_student_chatController.getById);

/**
 * @swagger
 * /api/v1/teacher-student-chat/:
 *   post:
 *     tags: [Chat]
 *     summary: Create new Chat
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.post("/", authenticateToken, teacher_student_chatController.create);

/**
 * @swagger
 * /api/v1/teacher-student-chat/{id}:
 *   put:
 *     tags: [Chat]
 *     summary: Update Chat
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
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.put("/:id", authenticateToken, teacher_student_chatController.update);

/**
 * @swagger
 * /api/v1/teacher-student-chat/{id}:
 *   delete:
 *     tags: [Chat]
 *     summary: Delete Chat
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", authenticateToken, teacher_student_chatController.delete);

module.exports = router;
