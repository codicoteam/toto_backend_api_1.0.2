const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (teacherController.loginTeacher) router.post("/login", teacherController.loginTeacher);
if (teacherController.registerTeacher) router.post("/register", teacherController.registerTeacher);

// Protected endpoints (if they exist)
if (teacherController.getAllTeachers) router.get("/", authenticateToken, teacherController.getAllTeachers);
if (teacherController.getTeacherById) router.get("/:id", authenticateToken, teacherController.getTeacherById);
if (teacherController.createTeacher) router.post("/", authenticateToken, teacherController.createTeacher);
if (teacherController.updateTeacher) router.put("/:id", authenticateToken, teacherController.updateTeacher);
if (teacherController.deleteTeacher) router.delete("/:id", authenticateToken, teacherController.deleteTeacher);

// Fallback for standard methods
if (!teacherController.getAllTeachers && teacherController.getAll) router.get("/", authenticateToken, teacherController.getAll);
if (!teacherController.getTeacherById && teacherController.getById) router.get("/:id", authenticateToken, teacherController.getById);
if (!teacherController.createTeacher && teacherController.create) router.post("/", authenticateToken, teacherController.create);
if (!teacherController.updateTeacher && teacherController.update) router.put("/:id", authenticateToken, teacherController.update);
if (!teacherController.deleteTeacher && teacherController.delete) router.delete("/:id", authenticateToken, teacherController.delete);

module.exports = router;
