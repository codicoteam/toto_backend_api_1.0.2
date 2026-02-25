const express = require("express");
const router = express.Router();
const record_examController = require("../controllers/record_exam_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (record_examController.loginRecord_exam) router.post("/login", record_examController.loginRecord_exam);
if (record_examController.registerRecord_exam) router.post("/register", record_examController.registerRecord_exam);

// Protected endpoints (if they exist)
if (record_examController.getAllRecord_exams) router.get("/", authenticateToken, record_examController.getAllRecord_exams);
if (record_examController.getRecord_examById) router.get("/:id", authenticateToken, record_examController.getRecord_examById);
if (record_examController.createRecord_exam) router.post("/", authenticateToken, record_examController.createRecord_exam);
if (record_examController.updateRecord_exam) router.put("/:id", authenticateToken, record_examController.updateRecord_exam);
if (record_examController.deleteRecord_exam) router.delete("/:id", authenticateToken, record_examController.deleteRecord_exam);

// Fallback for standard methods
if (!record_examController.getAllRecord_exams && record_examController.getAll) router.get("/", authenticateToken, record_examController.getAll);
if (!record_examController.getRecord_examById && record_examController.getById) router.get("/:id", authenticateToken, record_examController.getById);
if (!record_examController.createRecord_exam && record_examController.create) router.post("/", authenticateToken, record_examController.create);
if (!record_examController.updateRecord_exam && record_examController.update) router.put("/:id", authenticateToken, record_examController.update);
if (!record_examController.deleteRecord_exam && record_examController.delete) router.delete("/:id", authenticateToken, record_examController.delete);

module.exports = router;
