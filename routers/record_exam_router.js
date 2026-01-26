const express = require("express");
const router = express.Router();
const record_examController = require("../controllers/record_exam_controller");

/**
 * @swagger
 * tags:
 *   name: RecordExam
 *   description: RecordExam management endpoints
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
 * /api/v1/recordexam:
 *   get:
 *     tags:
 *       - RecordExam
 *     summary: Get all RecordExam records
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
router.get("/", authenticateToken, record_examController.getAll);

/**
 * @swagger
 * /api/v1/recordexam/{id}:
 *   get:
 *     tags:
 *       - RecordExam
 *     summary: Get RecordExam by ID
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
router.get("/:id", authenticateToken, record_examController.getById);

/**
 * @swagger
 * /api/v1/recordexam:
 *   post:
 *     tags:
 *       - RecordExam
 *     summary: Create new RecordExam
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
router.post("/", authenticateToken, record_examController.create);

/**
 * @swagger
 * /api/v1/recordexam/{id}:
 *   put:
 *     tags:
 *       - RecordExam
 *     summary: Update RecordExam
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
router.put("/:id", authenticateToken, record_examController.update);

/**
 * @swagger
 * /api/v1/recordexam/{id}:
 *   delete:
 *     tags:
 *       - RecordExam
 *     summary: Delete RecordExam
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
router.delete("/:id", authenticateToken, record_examController.delete);

module.exports = router;
