const router = express.Router();
const express = require("express");
const commentTopicContentController = require("../controllers/commentTopicContent_controller");
const { authenticateToken } = require("../middlewares/auth");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/comment_topic_content:
 *   get:
 *     summary: Get all comment topic content
 *     tags: [Comment topic content]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of comment topic content
 */

router.get("/", authenticateToken, commentTopicContentController.getAll);

router.get("/", authenticateToken, commentTopicContentController.getAll);
router.get("/:id", authenticateToken, commentTopicContentController.getById);
router.post("/", authenticateToken, commentTopicContentController.create);
router.put("/:id", authenticateToken, commentTopicContentController.update);
router.delete("/:id", authenticateToken, commentTopicContentController.delete);

module.exports = router;