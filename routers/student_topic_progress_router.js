const express = require("express");
const router = express.Router();
const student_topic_progressController = require("../controllers/student_topic_progress_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Student_topic_progress
 *   description: Student_topic_progress management
 */

/**
 * @swagger
 * /api/v1/student_topic_progress:
 *   get:
 *     tags: [Student_topic_progress]
 *     summary: Get all student_topic_progress records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", authenticateToken, student_topic_progressController.getAll);

/**
 * @swagger
 * /api/v1/student_topic_progress/{id}:
 *   get:
 *     tags: [Student_topic_progress]
 *     summary: Get student_topic_progress by ID
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
 */
router.get("/:id", authenticateToken, student_topic_progressController.getById);

/**
 * @swagger
 * /api/v1/student_topic_progress:
 *   post:
 *     tags: [Student_topic_progress]
 *     summary: Create new student_topic_progress
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post("/", authenticateToken, student_topic_progressController.create);

/**
 * @swagger
 * /api/v1/student_topic_progress/{id}:
 *   put:
 *     tags: [Student_topic_progress]
 *     summary: Update student_topic_progress
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
 *         description: Updated successfully
 */
router.put("/:id", authenticateToken, student_topic_progressController.update);

/**
 * @swagger
 * /api/v1/student_topic_progress/{id}:
 *   delete:
 *     tags: [Student_topic_progress]
 *     summary: Delete student_topic_progress
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
 *         description: Deleted successfully
 */
router.delete("/:id", authenticateToken, student_topic_progressController.delete);

module.exports = router;
