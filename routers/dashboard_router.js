const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard_controller");

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard management endpoints
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
 * /api/v1/dashboard:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Get all Dashboard records
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
router.get("/", authenticateToken, dashboardController.getAll);

/**
 * @swagger
 * /api/v1/dashboard/{id}:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Get Dashboard by ID
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
router.get("/:id", authenticateToken, dashboardController.getById);

/**
 * @swagger
 * /api/v1/dashboard:
 *   post:
 *     tags:
 *       - Dashboard
 *     summary: Create new Dashboard
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
router.post("/", authenticateToken, dashboardController.create);

/**
 * @swagger
 * /api/v1/dashboard/{id}:
 *   put:
 *     tags:
 *       - Dashboard
 *     summary: Update Dashboard
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
router.put("/:id", authenticateToken, dashboardController.update);

/**
 * @swagger
 * /api/v1/dashboard/{id}:
 *   delete:
 *     tags:
 *       - Dashboard
 *     summary: Delete Dashboard
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
router.delete("/:id", authenticateToken, dashboardController.delete);

router.get('/', authenticateToken, dashboardController.getAll);
router.post('/', authenticateToken, dashboardController.create);
module.exports = router;
