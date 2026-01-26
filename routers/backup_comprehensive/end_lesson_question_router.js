const router = express.Router();
const express = require("express");
const endLessonQuestionController = require("../controllers/endLessonQuestion_controller");
const { authenticateToken } = require("../middlewares/auth");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/end_lesson_question:
 *   get:
 *     summary: Get all end lesson question
 *     tags: [End lesson question]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of end lesson question
 */

router.get("/", authenticateToken, endLessonQuestionController.getAll);

router.get("/", authenticateToken, endLessonQuestionController.getAll);
router.get("/:id", authenticateToken, endLessonQuestionController.getById);
router.post("/", authenticateToken, endLessonQuestionController.create);
router.put("/:id", authenticateToken, endLessonQuestionController.update);
router.delete("/:id", authenticateToken, endLessonQuestionController.delete);

module.exports = router;