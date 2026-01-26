const express = require("express");
const router = express.Router();
const examController = require("../controllers/exam_controller");
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");

/**
 * @swagger
 *   get:
 *     summary: Get exam by ID
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exam ID
 *     responses:
 *       200:
 *         description: Exam retrieved successfully
 *       404:
 *         description: Exam not found
 */
/**
 * @swagger
 * /api/v1/exam:
 *   get:
 *     summary: Get all exams
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exams
 */
router.get("/get/:id", authenticateToken, examController.getExamById);

/**
 * @swagger

 * tags:
 *   name: Exam
 *   description: Exam management
 * /api/v1/exam/update/{id}:
 *   put:
 *     summary: Update exam by ID
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exam ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               durationInMinutes:
 *                 type: number
 *               questions:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Question'
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Exam updated successfully
 *       400:
 *         description: Failed to update exam
 *       403:
 *         description: Can only update your own exams
 */
/**
 * @swagger
 * /api/v1/exam:
 *   get:
 *     summary: Get all exams
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exams
 */
router.put("/update/:id", authenticateToken, examController.updateExam);

/**
 * @swagger
 * /api/v1/exam/delete/{id}:
 *   delete:
 *     summary: Delete exam by ID
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exam ID
 *     responses:
 *       200:
 *         description: Exam deleted successfully
 *       500:
 *         description: Failed to delete exam
 */
/**
 * @swagger
 * /api/v1/exam:
 *   get:
 *     summary: Get all exams
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exams
 */
router.delete("/delete/:id", authenticateToken, examController.deleteExam);

/**
 * @swagger
 * /api/v1/exam/by-teacher/{teacherId}:
 *   get:
 *     summary: Get exams by teacher ID
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Exams retrieved successfully
 *       404:
 *         description: No exams found for this teacher
 */
/**
 * @swagger
 * /api/v1/exam:
 *   get:
 *     summary: Get all exams
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exams
 */
router.get("/by-teacher/:teacherId", authenticateToken, examController.getExamsByTeacherId);

/**
 * @swagger
 * /api/v1/exam/publish/{id}:
 *   put:
 *     summary: Publish exam
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exam ID
 *     responses:
 *       200:
 *         description: Exam published successfully
 *       400:
 *         description: Failed to publish exam
 */
/**
 * @swagger
 * /api/v1/exam:
 *   get:
 *     summary: Get all exams
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exams
 */
router.put("/publish/:id", authenticateToken, examController.publishExam);

/**
 * @swagger
 * /api/v1/exam/unpublish/{id}:
 *   put:
 *     summary: Unpublish exam
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exam ID
 *     responses:
 *       200:
 *         description: Exam unpublished successfully
 *       400:
 *         description: Failed to unpublish exam
 */
/**
 * @swagger
 * /api/v1/exam:
 *   get:
 *     summary: Get all exams
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exams
 */
router.put("/unpublish/:id", authenticateToken, examController.unpublishExam);

/**
 * @swagger
 * /api/v1/exam/stats/{id}:
 *   get:
 *     summary: Get exam statistics
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exam ID
 *     responses:
 *       200:
 *         description: Exam statistics retrieved successfully
 *       400:
 *         description: Failed to get exam statistics
 */
/**
 * @swagger
 * /api/v1/exam:
 *   get:
 *     summary: Get all exams
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exams
 */
router.get("/stats/:id", authenticateToken, examController.getExamStats);

/**
 * @swagger
 * /api/v1/exam/{examId}/questions:
 *   post:
 *     summary: Add question to exam
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *         description: Exam ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: Question added successfully
 *       400:
 *         description: Failed to add question
 */
/**
 * @swagger
 * /api/v1/exam:
 *   get:
 *     summary: Get all exams
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exams
 */
router.post("/:examId/questions", authenticateToken, examController.addQuestion);

/**
 * @swagger
 * /api/v1/exam/{examId}/questions/{questionIndex}:
 *   put:
 *     summary: Update question
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *         description: Exam ID
 *       - in: path
 *         name: questionIndex
 *         required: true
 *         schema:
 *           type: integer
 *         description: Question index (0-based)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       400:
 *         description: Failed to update question
 */
/**
 * @swagger
 * /api/v1/exam:
 *   get:
 *     summary: Get all exams
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exams
 */
router.put("/:examId/questions/:questionIndex", authenticateToken, examController.updateQuestion);

/**
 * @swagger
 * /api/v1/exam/{examId}/questions/{questionIndex}:
 *   delete:
 *     summary: Delete question
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *         description: Exam ID
 *       - in: path
 *         name: questionIndex
 *         required: true
 *         schema:
 *           type: integer
 *         description: Question index (0-based)
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       400:
 *         description: Failed to delete question
 */
/**
 * @swagger
 * /api/v1/exam:
 *   get:
 *     summary: Get all exams
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exams
 */
router.delete("/:examId/questions/:questionIndex", authenticateToken, examController.deleteQuestion);

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - questionText
 *         - options
 *         - correctAnswer
 *       properties:
 *         questionText:
 *           type: string
 *         options:
 *           type: array
 *           items:
 *             type: string
 *         correctAnswer:
 *           type: string
 *         correctAnswerExplanation:
 *           type: string
 */

module.exports = router;
