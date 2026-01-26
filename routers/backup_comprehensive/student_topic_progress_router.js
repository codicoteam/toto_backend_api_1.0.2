const router = express.Router();
const express = require("express");
const studentTopicProgressController = require("../controllers/studentTopicProgress_controller");
const { authenticateToken } = require("../middlewares/auth");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/student_topic_progress:
 *   get:
 *     summary: Get all student topic progress
 *     tags: [Student topic progress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of student topic progress
 */

router.get("/", authenticateToken, studentTopicProgressController.getAll);

router.get("/", authenticateToken, studentTopicProgressController.getAll);
router.get("/:id", authenticateToken, studentTopicProgressController.getById);
router.post("/", authenticateToken, studentTopicProgressController.create);
router.put("/:id", authenticateToken, studentTopicProgressController.update);
router.delete("/:id", authenticateToken, studentTopicProgressController.delete);

module.exports = router;