const express = require("express");
const router = express.Router();
const end_lesson_questionController = require("../controllers/end_lesson_question_controller");

/**
 * @swagger
 * tags:
 *   name: LessonQuestions
 *   description: LessonQuestions management endpoints
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
 * /api/v1/lessonquestions:
 *   get:
 *     tags:
 *       - LessonQuestions
 *     summary: Get all LessonQuestions records
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
router.get("/", authenticateToken, end_lesson_questionController.getAll);

/**
 * @swagger
 * /api/v1/lessonquestions/{id}:
 *   get:
 *     tags:
 *       - LessonQuestions
 *     summary: Get LessonQuestions by ID
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
router.get("/:id", authenticateToken, end_lesson_questionController.getById);

/**
 * @swagger
 * /api/v1/lessonquestions:
 *   post:
 *     tags:
 *       - LessonQuestions
 *     summary: Create new LessonQuestions
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
router.post("/", authenticateToken, end_lesson_questionController.create);

/**
 * @swagger
 * /api/v1/lessonquestions/{id}:
 *   put:
 *     tags:
 *       - LessonQuestions
 *     summary: Update LessonQuestions
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
router.put("/:id", authenticateToken, end_lesson_questionController.update);

/**
 * @swagger
 * /api/v1/lessonquestions/{id}:
 *   delete:
 *     tags:
 *       - LessonQuestions
 *     summary: Delete LessonQuestions
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
router.delete("/:id", authenticateToken, end_lesson_questionController.delete);

router.get('/', authenticateToken, end_lesson_questionController.getAll);
router.post('/', authenticateToken, end_lesson_questionController.create);
module.exports = router;
