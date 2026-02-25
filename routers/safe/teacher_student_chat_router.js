const express = require("express");
const router = express.Router();
const teacher_student_chatController = require("../controllers/teacher_student_chat_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (teacher_student_chatController.loginTeacher_student_chat) router.post("/login", teacher_student_chatController.loginTeacher_student_chat);
if (teacher_student_chatController.registerTeacher_student_chat) router.post("/register", teacher_student_chatController.registerTeacher_student_chat);

// Protected endpoints (if they exist)
if (teacher_student_chatController.getAllTeacher_student_chats) router.get("/", authenticateToken, teacher_student_chatController.getAllTeacher_student_chats);
if (teacher_student_chatController.getTeacher_student_chatById) router.get("/:id", authenticateToken, teacher_student_chatController.getTeacher_student_chatById);
if (teacher_student_chatController.createTeacher_student_chat) router.post("/", authenticateToken, teacher_student_chatController.createTeacher_student_chat);
if (teacher_student_chatController.updateTeacher_student_chat) router.put("/:id", authenticateToken, teacher_student_chatController.updateTeacher_student_chat);
if (teacher_student_chatController.deleteTeacher_student_chat) router.delete("/:id", authenticateToken, teacher_student_chatController.deleteTeacher_student_chat);

// Fallback for standard methods
if (!teacher_student_chatController.getAllTeacher_student_chats && teacher_student_chatController.getAll) router.get("/", authenticateToken, teacher_student_chatController.getAll);
if (!teacher_student_chatController.getTeacher_student_chatById && teacher_student_chatController.getById) router.get("/:id", authenticateToken, teacher_student_chatController.getById);
if (!teacher_student_chatController.createTeacher_student_chat && teacher_student_chatController.create) router.post("/", authenticateToken, teacher_student_chatController.create);
if (!teacher_student_chatController.updateTeacher_student_chat && teacher_student_chatController.update) router.put("/:id", authenticateToken, teacher_student_chatController.update);
if (!teacher_student_chatController.deleteTeacher_student_chat && teacher_student_chatController.delete) router.delete("/:id", authenticateToken, teacher_student_chatController.delete);

module.exports = router;
