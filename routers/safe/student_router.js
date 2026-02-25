const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (studentController.loginStudent) router.post("/login", studentController.loginStudent);
if (studentController.registerStudent) router.post("/register", studentController.registerStudent);

// Protected endpoints (if they exist)
if (studentController.getAllStudents) router.get("/", authenticateToken, studentController.getAllStudents);
if (studentController.getStudentById) router.get("/:id", authenticateToken, studentController.getStudentById);
if (studentController.createStudent) router.post("/", authenticateToken, studentController.createStudent);
if (studentController.updateStudent) router.put("/:id", authenticateToken, studentController.updateStudent);
if (studentController.deleteStudent) router.delete("/:id", authenticateToken, studentController.deleteStudent);

// Fallback for standard methods
if (!studentController.getAllStudents && studentController.getAll) router.get("/", authenticateToken, studentController.getAll);
if (!studentController.getStudentById && studentController.getById) router.get("/:id", authenticateToken, studentController.getById);
if (!studentController.createStudent && studentController.create) router.post("/", authenticateToken, studentController.create);
if (!studentController.updateStudent && studentController.update) router.put("/:id", authenticateToken, studentController.update);
if (!studentController.deleteStudent && studentController.delete) router.delete("/:id", authenticateToken, studentController.delete);

module.exports = router;
