const express = require("express");
const router = express.Router();
const contentSystemController = require("../controllers/contentSystem_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/content_system:
 *   get:
 *     summary: Get all content systems
 *     tags: [Content System]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of content systems
 */

router.get("/", authenticateToken, contentSystemController.getAll);

module.exports = router;
