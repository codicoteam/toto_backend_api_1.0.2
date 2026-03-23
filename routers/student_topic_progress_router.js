const express = require("express");
const router = express.Router();
const progressController = require("../controllers/student_topic_progress_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: StudentTopicProgress
 *   description: Student topic progress tracking
 */

/**
 * @swagger
 * /api/v1/student-topic-progress:
 *   get:
 *     tags: [StudentTopicProgress]
 *     summary: Get all progress records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of progress records
 */
router.get("/", authenticateToken, progressController.getAllProgress);

/**
 * @swagger
 * /api/v1/student-topic-progress/student/{studentId}:
 *   get:
 *     tags: [StudentTopicProgress]
 *     summary: Get progress by student ID
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
 *         description: Student's progress records
 */
router.get("/student/:studentId", authenticateToken, progressController.getByStudentId);

/**
 * @swagger
 * /api/v1/student-topic-progress/topic/{topicId}:
 *   get:
 *     tags: [StudentTopicProgress]
 *     summary: Get progress by topic ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic ID
 *     responses:
 *       200:
 *         description: Progress records for topic
 */
router.get("/topic/:topicId", authenticateToken, progressController.getByTopicId);

/**
 * @swagger
 * /api/v1/student-topic-progress/student/{studentId}/topic/{topicId}:
 *   get:
 *     tags: [StudentTopicProgress]
 *     summary: Get specific student's progress for a topic
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic ID
 *     responses:
 *       200:
 *         description: Student's topic progress
 */
router.get("/student/:studentId/topic/:topicId", authenticateToken, progressController.getStudentTopicProgress);

/**
 * @swagger
 * /api/v1/student-topic-progress:
 *   post:
 *     tags: [StudentTopicProgress]
 *     summary: Create progress record
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
 *               - topicId
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *                 description: Student ID (required)
 *               topicId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c86"
 *                 description: Topic ID (required)
 *               status:
 *                 type: string
 *                 enum: [not_started, in_progress, completed]
 *                 example: "in_progress"
 *                 description: Progress status
 *               progressPercentage:
 *                 type: number
 *                 example: 75
 *                 description: Progress percentage (0-100)
 *               timeSpent:
 *                 type: number
 *                 example: 120
 *                 description: Time spent in minutes
 *               lastAccessed:
 *                 type: string
 *                 format: date-time
 *                 description: Last accessed timestamp
 *               completedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Completion timestamp
 *     responses:
 *       201:
 *         description: Progress record created
 */
router.post("/", authenticateToken, progressController.createProgress);

/**
 * @swagger
 * /api/v1/student-topic-progress/{id}:
 *   put:
 *     tags: [StudentTopicProgress]
 *     summary: Update progress record
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Progress record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [not_started, in_progress, completed]
 *               progressPercentage:
 *                 type: number
 *               timeSpent:
 *                 type: number
 *               lastAccessed:
 *                 type: string
 *                 format: date-time
 *               completedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Progress record updated
 */
router.put("/:id", authenticateToken, progressController.updateProgress);

/**
 * @swagger
 * /api/v1/student-topic-progress/{id}:
 *   delete:
 *     tags: [StudentTopicProgress]
 *     summary: Delete progress record
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Progress record ID
 *     responses:
 *       200:
 *         description: Progress record deleted
 */
router.delete("/:id", authenticateToken, progressController.deleteProgress);

/**
 * @swagger
 * /api/v1/student-topic-progress/student/{studentId}/summary:
 *   get:
 *     tags: [StudentTopicProgress]
 *     summary: Get progress summary for a student
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
 *         description: Student's progress summary
 */
router.get("/student/:studentId/summary", authenticateToken, progressController.getStudentProgressSummary);

module.exports = router;
