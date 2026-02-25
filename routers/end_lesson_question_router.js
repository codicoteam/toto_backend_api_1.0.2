const express = require("express");
const router = express.Router();
const questionController = require("../controllers/end_lesson_question_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: EndLessonQuestion
 *   description: End of lesson questions
 */

/**
 * @swagger
 * /api/v1/end_lesson_questions/{id}:
 *   put:
 *     tags: [EndLessonQuestion]
 *     summary: Update question
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
 *         description: Question updated
 */
router.put("/:id", authenticateToken, questionController.updateQuestion);

/**
 * @swagger
 * /api/v1/end_lesson_questions/topic-content/{topicContentId}:
 *   get:
 *     tags: [EndLessonQuestion]
 *     summary: Get questions by topic content ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: topicContentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Questions list
 */
router.get("/topic-content/:topicContentId", authenticateToken, questionController.getQuestionsByTopicContentId);

module.exports = router;
