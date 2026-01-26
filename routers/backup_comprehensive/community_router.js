const router = express.Router();
const express = require("express");
const communityController = require("../controllers/community_controller");
const { authenticateToken } = require("../middlewares/auth");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/community:
 *   get:
 *     summary: Get all community
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of community
 */

router.get("/", authenticateToken, communityController.getAll);

router.get("/", authenticateToken, communityController.getAll);
router.get("/:id", authenticateToken, communityController.getById);
router.post("/", authenticateToken, communityController.create);
router.put("/:id", authenticateToken, communityController.update);
router.delete("/:id", authenticateToken, communityController.delete);

module.exports = router;