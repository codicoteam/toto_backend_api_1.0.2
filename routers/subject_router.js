const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subject_controller");

/**
 * @swagger
 * tags:
 *   name: Subject
 *   description: Subject management endpoints
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
 * /api/v1/subject:
 *   get:
 *     tags:
 *       - Subject
 *     summary: Get all Subject records
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
router.get("/", authenticateToken, subjectController.getAll);

/**
 * @swagger
 * /api/v1/subject/{id}:
 *   get:
 *     tags:
 *       - Subject
 *     summary: Get Subject by ID
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
router.get("/:id", authenticateToken, subjectController.getById);

/**
 * @swagger
 * /api/v1/subject:
 *   post:
 *     tags:
 *       - Subject
 *     summary: Create new Subject
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
router.post("/", authenticateToken, subjectController.create);

/**
 * @swagger
 * /api/v1/subject/{id}:
 *   put:
 *     tags:
 *       - Subject
 *     summary: Update Subject
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
router.put("/:id", authenticateToken, subjectController.update);

/**
 * @swagger
 * /api/v1/subject/{id}:
 *   delete:
 *     tags:
 *       - Subject
 *     summary: Delete Subject
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
router.delete("/:id", authenticateToken, subjectController.delete);

router.get('/', authenticateToken, subjectController.getAll);
router.post('/', authenticateToken, subjectController.create);
module.exports = router;
