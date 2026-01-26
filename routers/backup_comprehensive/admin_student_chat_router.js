const router = express.Router();
const express = require("express");
const chatController = require("../controllers/chat_controller");
const { authenticateToken } = require("../middlewares/auth");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/admin_student_chat:
 *   get:
 *     summary: Get all admin student chat
 *     tags: [Admin student chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admin student chat
 */

router.get("/", authenticateToken, chatController.getAll);

router.get("/", authenticateToken, chatController.getAll);
router.get("/:id", authenticateToken, chatController.getById);
router.post("/", authenticateToken, chatController.create);
router.put("/:id", authenticateToken, chatController.update);
router.delete("/:id", authenticateToken, chatController.delete);

module.exports = router;