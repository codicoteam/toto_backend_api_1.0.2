const router = express.Router();
const express = require("express");
const messageCommunityController = require("../controllers/messageCommunity_controller");
const { authenticateToken } = require("../middlewares/auth");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/message_community:
 *   get:
 *     summary: Get all message community
 *     tags: [Message community]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of message community
 */

router.get("/", authenticateToken, messageCommunityController.getAll);

router.get("/", authenticateToken, messageCommunityController.getAll);
router.get("/:id", authenticateToken, messageCommunityController.getById);
router.post("/", authenticateToken, messageCommunityController.create);
router.put("/:id", authenticateToken, messageCommunityController.update);
router.delete("/:id", authenticateToken, messageCommunityController.delete);

module.exports = router;