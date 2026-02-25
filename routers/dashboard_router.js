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
 * /api/v1/dashboards/student-level-info:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get student level info
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *         description: Student level (e.g., "A Level")
 *       - in: query
 *         name: studentId
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Dashboard data
 */
router.get("/student-level-info", authenticateToken, dashboardController.getStudentLevelInfo);

/**
 * @swagger
 * /api/v1/dashboards/dashboard:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get main dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 */
router.get("/dashboard", authenticateToken, dashboardController.getDashboard);

module.exports = router;
