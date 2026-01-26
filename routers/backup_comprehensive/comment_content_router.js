const router = express.Router();
const express = require("express");
const commentContentController = require("../controllers/commentContent_controller");
const { authenticateToken } = require("../middlewares/auth");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/comment_content:
 *   get:
 *     summary: Get all comment content
 *     tags: [Comment content]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of comment content
 */

router.get("/", authenticateToken, commentContentController.getAll);

router.get("/", authenticateToken, commentContentController.getAll);
router.get("/:id", authenticateToken, commentContentController.getById);
router.post("/", authenticateToken, commentContentController.create);
router.put("/:id", authenticateToken, commentContentController.update);
router.delete("/:id", authenticateToken, commentContentController.delete);

module.exports = router;