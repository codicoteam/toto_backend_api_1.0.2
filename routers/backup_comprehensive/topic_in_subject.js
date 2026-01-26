const router = express.Router();
const express = require("express");
const topicInSubjectController = require("../controllers/topicInSubject_controller");
const { authenticateToken } = require("../middlewares/auth");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/topic_in_subject:
 *   get:
 *     summary: Get all topic in subject.js
 *     tags: [Topic in subject.js]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of topic in subject.js
 */

router.get("/", authenticateToken, topicInSubjectController.getAll);

router.get("/", authenticateToken, topicInSubjectController.getAll);
router.get("/:id", authenticateToken, topicInSubjectController.getById);
router.post("/", authenticateToken, topicInSubjectController.create);
router.put("/:id", authenticateToken, topicInSubjectController.update);
router.delete("/:id", authenticateToken, topicInSubjectController.delete);

module.exports = router;