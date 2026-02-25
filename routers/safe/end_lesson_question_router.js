const express = require("express");
const router = express.Router();
const end_lesson_questionController = require("../controllers/end_lesson_question_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (end_lesson_questionController.loginEnd_lesson_question) router.post("/login", end_lesson_questionController.loginEnd_lesson_question);
if (end_lesson_questionController.registerEnd_lesson_question) router.post("/register", end_lesson_questionController.registerEnd_lesson_question);

// Protected endpoints (if they exist)
if (end_lesson_questionController.getAllEnd_lesson_questions) router.get("/", authenticateToken, end_lesson_questionController.getAllEnd_lesson_questions);
if (end_lesson_questionController.getEnd_lesson_questionById) router.get("/:id", authenticateToken, end_lesson_questionController.getEnd_lesson_questionById);
if (end_lesson_questionController.createEnd_lesson_question) router.post("/", authenticateToken, end_lesson_questionController.createEnd_lesson_question);
if (end_lesson_questionController.updateEnd_lesson_question) router.put("/:id", authenticateToken, end_lesson_questionController.updateEnd_lesson_question);
if (end_lesson_questionController.deleteEnd_lesson_question) router.delete("/:id", authenticateToken, end_lesson_questionController.deleteEnd_lesson_question);

// Fallback for standard methods
if (!end_lesson_questionController.getAllEnd_lesson_questions && end_lesson_questionController.getAll) router.get("/", authenticateToken, end_lesson_questionController.getAll);
if (!end_lesson_questionController.getEnd_lesson_questionById && end_lesson_questionController.getById) router.get("/:id", authenticateToken, end_lesson_questionController.getById);
if (!end_lesson_questionController.createEnd_lesson_question && end_lesson_questionController.create) router.post("/", authenticateToken, end_lesson_questionController.create);
if (!end_lesson_questionController.updateEnd_lesson_question && end_lesson_questionController.update) router.put("/:id", authenticateToken, end_lesson_questionController.update);
if (!end_lesson_questionController.deleteEnd_lesson_question && end_lesson_questionController.delete) router.delete("/:id", authenticateToken, end_lesson_questionController.delete);

module.exports = router;
