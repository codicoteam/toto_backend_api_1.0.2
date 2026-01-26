const router = express.Router();
const express = require("express");
const dashboardController = require("../controllers/dashboard_controller");
const { authenticateToken } = require("../middlewares/auth");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/dashboard:
 *   get:
 *     summary: Get all dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of dashboard
 */

router.get("/", authenticateToken, dashboardController.getAll);

router.get("/", authenticateToken, dashboardController.getAll);
router.get("/:id", authenticateToken, dashboardController.getById);
router.post("/", authenticateToken, dashboardController.create);
router.put("/:id", authenticateToken, dashboardController.update);
router.delete("/:id", authenticateToken, dashboardController.delete);

module.exports = router;