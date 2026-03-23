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
 * /api/v1/record-exam:
 *   get:
 *     tags: [RecordExam]
 *     summary: Get all exam records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exam records
 */
router.get("/", authenticateToken, recordExamController.getAllRecords);

/**
 * @swagger
 * /api/v1/record-exam/{id}:
 *   get:
 *     tags: [RecordExam]
 *     summary: Get exam record by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID
 *     responses:
 *       200:
 *         description: Exam record details
 */
router.get("/:id", authenticateToken, recordExamController.getRecordById);

/**
 * @swagger
 * /api/v1/record-exam:
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
 *               - examId
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *                 description: Student ID (required)
 *               examId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c86"
 *                 description: Exam ID (required)
 *               score:
 *                 type: number
 *                 example: 85
 *                 description: Exam score
 *               percentage:
 *                 type: number
 *                 example: 85.5
 *                 description: Percentage score
 *               grade:
 *                 type: string
 *                 example: "A"
 *                 description: Grade achieved
 *               results:
 *                 type: object
 *                 description: Detailed results
 *               comment:
 *                 type: string
 *                 example: "Good performance"
 *                 description: Teacher's comment
 *               submittedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Submission time
 *     responses:
 *       201:
 *         description: Record created
 */
router.post("/", authenticateToken, recordExamController.createRecord);

/**
 * @swagger
 * /api/v1/record-exam/student/{studentId}:
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
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student exam records
 */
router.get("/student/:studentId", authenticateToken, recordExamController.getRecordsByStudentId);

/**
 * @swagger
 * /api/v1/record-exam/exam/{examId}:
 *   get:
 *     tags: [RecordExam]
 *     summary: Get exam records by exam ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *         description: Exam ID
 *     responses:
 *       200:
 *         description: Exam records
 */
router.get("/exam/:examId", authenticateToken, recordExamController.getRecordsByExamId);

/**
 * @swagger
 * /api/v1/record-exam/exam/{examId}/top-students:
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
 *         description: Exam ID
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of top students to return
 *     responses:
 *       200:
 *         description: Top students list
 */
router.get("/exam/:examId/top-students", authenticateToken, recordExamController.getTopStudentsByExamId);

/**
 * @swagger
 * /api/v1/record-exam/{id}:
 *   put:
 *     tags: [RecordExam]
 *     summary: Update exam record
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *               percentage:
 *                 type: number
 *               grade:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Record updated
 */
router.put("/:id", authenticateToken, recordExamController.updateRecord);

/**
 * @swagger
 * /api/v1/record-exam/{id}:
 *   delete:
 *     tags: [RecordExam]
 *     summary: Delete exam record
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID
 *     responses:
 *       200:
 *         description: Record deleted
 */
router.delete("/:id", authenticateToken, recordExamController.deleteRecord);

module.exports = router;
