const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subject_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (subjectController.loginSubject) router.post("/login", subjectController.loginSubject);
if (subjectController.registerSubject) router.post("/register", subjectController.registerSubject);

// Protected endpoints (if they exist)
if (subjectController.getAllSubjects) router.get("/", authenticateToken, subjectController.getAllSubjects);
if (subjectController.getSubjectById) router.get("/:id", authenticateToken, subjectController.getSubjectById);
if (subjectController.createSubject) router.post("/", authenticateToken, subjectController.createSubject);
if (subjectController.updateSubject) router.put("/:id", authenticateToken, subjectController.updateSubject);
if (subjectController.deleteSubject) router.delete("/:id", authenticateToken, subjectController.deleteSubject);

// Fallback for standard methods
if (!subjectController.getAllSubjects && subjectController.getAll) router.get("/", authenticateToken, subjectController.getAll);
if (!subjectController.getSubjectById && subjectController.getById) router.get("/:id", authenticateToken, subjectController.getById);
if (!subjectController.createSubject && subjectController.create) router.post("/", authenticateToken, subjectController.create);
if (!subjectController.updateSubject && subjectController.update) router.put("/:id", authenticateToken, subjectController.update);
if (!subjectController.deleteSubject && subjectController.delete) router.delete("/:id", authenticateToken, subjectController.delete);

module.exports = router;
