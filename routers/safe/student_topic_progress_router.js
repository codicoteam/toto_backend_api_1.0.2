const express = require("express");
const router = express.Router();
const student_topic_progressController = require("../controllers/student_topic_progress_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (student_topic_progressController.loginStudent_topic_progress) router.post("/login", student_topic_progressController.loginStudent_topic_progress);
if (student_topic_progressController.registerStudent_topic_progress) router.post("/register", student_topic_progressController.registerStudent_topic_progress);

// Protected endpoints (if they exist)
if (student_topic_progressController.getAllStudent_topic_progresss) router.get("/", authenticateToken, student_topic_progressController.getAllStudent_topic_progresss);
if (student_topic_progressController.getStudent_topic_progressById) router.get("/:id", authenticateToken, student_topic_progressController.getStudent_topic_progressById);
if (student_topic_progressController.createStudent_topic_progress) router.post("/", authenticateToken, student_topic_progressController.createStudent_topic_progress);
if (student_topic_progressController.updateStudent_topic_progress) router.put("/:id", authenticateToken, student_topic_progressController.updateStudent_topic_progress);
if (student_topic_progressController.deleteStudent_topic_progress) router.delete("/:id", authenticateToken, student_topic_progressController.deleteStudent_topic_progress);

// Fallback for standard methods
if (!student_topic_progressController.getAllStudent_topic_progresss && student_topic_progressController.getAll) router.get("/", authenticateToken, student_topic_progressController.getAll);
if (!student_topic_progressController.getStudent_topic_progressById && student_topic_progressController.getById) router.get("/:id", authenticateToken, student_topic_progressController.getById);
if (!student_topic_progressController.createStudent_topic_progress && student_topic_progressController.create) router.post("/", authenticateToken, student_topic_progressController.create);
if (!student_topic_progressController.updateStudent_topic_progress && student_topic_progressController.update) router.put("/:id", authenticateToken, student_topic_progressController.update);
if (!student_topic_progressController.deleteStudent_topic_progress && student_topic_progressController.delete) router.delete("/:id", authenticateToken, student_topic_progressController.delete);

module.exports = router;
