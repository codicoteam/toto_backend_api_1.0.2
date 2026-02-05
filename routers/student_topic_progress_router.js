const express = require("express");
const router = express.Router();
const student_topic_progressController = require("../controllers/student_topic_progress_controller");

/**
 * @swagger
 * tags:
 *   name: Progress
 *   description: Progress management endpoints
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

// Basic CRUD routes

/**
 * @swagger
 * /api/v1/progress:
 *   get:
 *     tags:
 *       - Progress
 *     summary: Get all Progress records
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
router.get("/", authenticateToken, student_topic_progressController.getAll);

/**
 * @swagger
 * /api/v1/progress/{id}:
 *   get:
 *     tags:
 *       - Progress
 *     summary: Get Progress by ID
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
router.get("/:id", authenticateToken, student_topic_progressController.getById);

/**
 * @swagger
 * /api/v1/progress:
 *   post:
 *     tags:
 *       - Progress
 *     summary: Create new Progress
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
router.post("/", authenticateToken, student_topic_progressController.create);

/**
 * @swagger
 * /api/v1/progress/{id}:
 *   put:
 *     tags:
 *       - Progress
 *     summary: Update Progress
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
router.put("/:id", authenticateToken, student_topic_progressController.update);

/**
 * @swagger
 * /api/v1/progress/{id}:
 *   delete:
 *     tags:
 *       - Progress
 *     summary: Delete Progress
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
router.delete("/:id", authenticateToken, student_topic_progressController.delete);

router.get('/', authenticateToken, student_topic_progressController.getAll);
router.post('/', authenticateToken, student_topic_progressController.create);
module.exports = router;
