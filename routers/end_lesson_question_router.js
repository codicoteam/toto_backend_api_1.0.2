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
 * /api/v1/end-lesson-question:
 *   get:
 *     tags: [EndLessonQuestion]
 *     summary: Get all questions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of questions
 */
router.get("/", authenticateToken, questionController.getAllQuestions);

/**
 * @swagger
 * /api/v1/end-lesson-question/{id}:
 *   get:
 *     tags: [EndLessonQuestion]
 *     summary: Get question by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *     responses:
 *       200:
 *         description: Question details
 */
router.get("/:id", authenticateToken, questionController.getQuestionById);

/**
 * @swagger
 * /api/v1/end-lesson-question:
 *   post:
 *     tags: [EndLessonQuestion]
 *     summary: Create new question
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Algebra Basics Question"
 *               description:
 *                 type: string
 *                 example: "What is the value of x in 2x + 5 = 15?"
 *               topicContentId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["x = 5", "x = 10", "x = 7", "x = 3"]
 *               correctAnswer:
 *                 type: string
 *                 example: "x = 5"
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 default: "active"
 *     responses:
 *       201:
 *         description: Question created successfully
 */
router.post("/", authenticateToken, questionController.createQuestion);

/**
 * @swagger
 * /api/v1/end-lesson-question/{id}:
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
 *         description: Question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               correctAnswer:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Question updated
 */
router.put("/:id", authenticateToken, questionController.updateQuestion);

/**
 * @swagger
 * /api/v1/end-lesson-question/{id}:
 *   delete:
 *     tags: [EndLessonQuestion]
 *     summary: Delete question
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *     responses:
 *       200:
 *         description: Question deleted
 */
router.delete("/:id", authenticateToken, questionController.deleteQuestion);

/**
 * @swagger
 * /api/v1/end-lesson-question/topic-content/{topicContentId}:
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
 *         description: Topic Content ID
 *     responses:
 *       200:
 *         description: Questions list
 */
router.get("/topic-content/:topicContentId", authenticateToken, questionController.getQuestionsByTopicContentId);

module.exports = router;
