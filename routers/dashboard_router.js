const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard data
 */

/**
 * @swagger
 * /api/v1/dashboard/student-level-info:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get student level info
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: level
 *         required: false
 *         schema:
 *           type: string
 *         description: Student level (e.g., "A Level", "O Level")
 *         example: "A Level"
 *       - in: query
 *         name: studentId
 *         required: false
 *         schema:
 *           type: string
 *         description: Student ID (optional)
 *         example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       200:
 *         description: Dashboard data retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.get("/student-level-info", authenticateToken, dashboardController.getStudentLevelInfo);

/**
 * @swagger
 * /api/v1/dashboard:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get main dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.get("/", authenticateToken, dashboardController.getDashboard);

module.exports = router;
