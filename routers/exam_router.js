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
 * /api/v1/exam/create:
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
 *               - subject
 *               - title
 *               - questions
 *             properties:
 *               subject:
 *                 type: string
 *               Topic:
 *                 type: string
 *               level:
 *                 type: string
 *               title:
 *                 type: string
 *               durationInMinutes:
 *                 type: number
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionText:
 *                       type: string
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *                     correctAnswer:
 *                       type: string
 *                     correctAnswerExplanation:
 *                       type: string
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Exam created
 */
router.post("/create", authenticateToken, examController.createExam);

/**
 * @swagger
 * /api/v1/exam/getall:
 *   get:
 *     tags: [Exam]
 *     summary: Get all exams
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exams
 */
router.get("/getall", authenticateToken, examController.getAllExams);

/**
 * @swagger
 * /api/v1/exam/get/{id}:
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
router.get("/get/:id", authenticateToken, examController.getExamById);

/**
 * @swagger
 * /api/v1/exam/update/{id}:
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
router.put("/update/:id", authenticateToken, examController.updateExam);

/**
 * @swagger
 * /api/v1/exam/delete/{id}:
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
router.delete("/delete/:id", authenticateToken, examController.deleteExam);

module.exports = router;
