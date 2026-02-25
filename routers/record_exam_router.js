const express = require("express");
const router = express.Router();
const recordExamController = require("../controllers/record_exam_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: RecordExam
 *   description: Exam records management
 */

/**
 * @swagger
 * /api/v1/record_exam/:
 *   post:
 *     tags: [RecordExam]
 *     summary: Create exam record
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - ExamId
 *             properties:
 *               comment:
 *                 type: string
 *               percentange:
 *                 type: string
 *               results:
 *                 type: string
 *               studentId:
 *                 type: string
 *               ExamId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Record created
 */
router.post("/", authenticateToken, recordExamController.createRecord);

/**
 * @swagger
 * /api/v1/record_exam/exam/{examId}/top-students:
 *   get:
 *     tags: [RecordExam]
 *     summary: Get top students for exam
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Top students list
 */
router.get("/exam/:examId/top-students", authenticateToken, recordExamController.getTopStudentsByExamId);

/**
 * @swagger
 * /api/v1/record_exam/student/{studentId}:
 *   get:
 *     tags: [RecordExam]
 *     summary: Get exam records by student ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student exam records
 */
router.get("/student/:studentId", authenticateToken, recordExamController.getRecordsByStudentId);

module.exports = router;
