const express = require("express");
const router = express.Router();
const examController = require("../controllers/exam_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (examController.loginExam) router.post("/login", examController.loginExam);
if (examController.registerExam) router.post("/register", examController.registerExam);

// Protected endpoints (if they exist)
if (examController.getAllExams) router.get("/", authenticateToken, examController.getAllExams);
if (examController.getExamById) router.get("/:id", authenticateToken, examController.getExamById);
if (examController.createExam) router.post("/", authenticateToken, examController.createExam);
if (examController.updateExam) router.put("/:id", authenticateToken, examController.updateExam);
if (examController.deleteExam) router.delete("/:id", authenticateToken, examController.deleteExam);

// Fallback for standard methods
if (!examController.getAllExams && examController.getAll) router.get("/", authenticateToken, examController.getAll);
if (!examController.getExamById && examController.getById) router.get("/:id", authenticateToken, examController.getById);
if (!examController.createExam && examController.create) router.post("/", authenticateToken, examController.create);
if (!examController.updateExam && examController.update) router.put("/:id", authenticateToken, examController.update);
if (!examController.deleteExam && examController.delete) router.delete("/:id", authenticateToken, examController.delete);

module.exports = router;
