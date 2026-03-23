const express = require("express");
const router = express.Router();
const examController = require("../controllers/exam_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Exam
 *   description: Exam management
 */

/**
 * @swagger
 * /api/v1/exam:
 *   get:
 *     tags: [Exam]
 *     summary: Get all exams
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exams
 */
router.get("/", authenticateToken, examController.getAllExams);

/**
 * @swagger
 * /api/v1/exam/{id}:
 *   get:
 *     tags: [Exam]
 *     summary: Get exam by ID
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
 *         description: Exam details
 */
router.get("/:id", authenticateToken, examController.getExamById);

/**
 * @swagger
 * /api/v1/exam:
 *   post:
 *     tags: [Exam]
 *     summary: Create exam
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
 *               - title
 *               - subject
 *               - questions
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mathematics Final Exam 2024"
 *                 description: Exam name (required)
 *               title:
 *                 type: string
 *                 example: "Algebra and Calculus Final"
 *                 description: Exam title (required)
 *               subject:
 *                 type: string
 *                 example: "Mathematics"
 *                 description: Subject name (required)
 *               Topic:
 *                 type: string
 *                 example: "Algebra"
 *                 description: Topic name
 *               level:
 *                 type: string
 *                 enum: ["O Level", "A Level", "Form 1", "Form 2", "Form 3", "Form 4"]
 *                 example: "A Level"
 *                 description: Education level
 *               durationInMinutes:
 *                 type: number
 *                 example: 120
 *                 description: Exam duration in minutes
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - questionText
 *                     - correctAnswer
 *                   properties:
 *                     questionText:
 *                       type: string
 *                       example: "What is the value of x in 2x + 5 = 15?"
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["x = 5", "x = 10", "x = 7", "x = 3"]
 *                     correctAnswer:
 *                       type: string
 *                       example: "x = 5"
 *                     correctAnswerExplanation:
 *                       type: string
 *                       example: "Subtract 5 from both sides, then divide by 2"
 *               isPublished:
 *                 type: boolean
 *                 example: false
 *                 description: Whether the exam is published
 *     responses:
 *       201:
 *         description: Exam created
 */
router.post("/", authenticateToken, examController.createExam);

/**
 * @swagger
 * /api/v1/exam/{id}:
 *   put:
 *     tags: [Exam]
 *     summary: Update exam
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
 *         description: Exam updated
 */
router.put("/:id", authenticateToken, examController.updateExam);

/**
 * @swagger
 * /api/v1/exam/{id}:
 *   delete:
 *     tags: [Exam]
 *     summary: Delete exam
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
 *         description: Exam deleted
 */
router.delete("/:id", authenticateToken, examController.deleteExam);

module.exports = router;
