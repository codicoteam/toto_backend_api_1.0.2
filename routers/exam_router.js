const express = require("express");
const router = express.Router();
const examController = require("../controllers/exam_controller");

/**
 * @swagger
 * tags:
 *   name: Exam
 *   description: Exam management endpoints
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

const { authenticateToken } = require("../middlewares/auth");

// Basic routes (customize based on actual controller functions)

/**
 * @swagger
 * /api/v1/exam:
 *   get:
 *     tags:
 *       - Exam
 *     summary: Get all Exam records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/", authenticateToken, examController.getAll || examController.getAllExams);

/**
 * @swagger
 * /api/v1/exam/{id}:
 *   get:
 *     tags:
 *       - Exam
 *     summary: Get Exam by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.get("/:id", authenticateToken, examController.getById || examController.getExamById);

/**
 * @swagger
 * /api/v1/exam:
 *   post:
 *     tags:
 *       - Exam
 *     summary: Create new Exam
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
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/", authenticateToken, examController.create || examController.createExam);

/**
 * @swagger
 * /api/v1/exam/{id}:
 *   put:
 *     tags:
 *       - Exam
 *     summary: Update Exam
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *       404:
 *         description: Not found
 */
router.put("/:id", authenticateToken, examController.update || examController.updateExam);

/**
 * @swagger
 * /api/v1/exam/{id}:
 *   delete:
 *     tags:
 *       - Exam
 *     summary: Delete Exam
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.delete("/:id", authenticateToken, examController.delete || examController.deleteExam);

module.exports = router;
