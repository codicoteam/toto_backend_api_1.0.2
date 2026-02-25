const express = require("express");
const router = express.Router();
const topic_in_subjectController = require("../controllers/topic_in_subject_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (topic_in_subjectController.loginTopic_in_subject) router.post("/login", topic_in_subjectController.loginTopic_in_subject);
if (topic_in_subjectController.registerTopic_in_subject) router.post("/register", topic_in_subjectController.registerTopic_in_subject);

// Protected endpoints (if they exist)
if (topic_in_subjectController.getAllTopic_in_subjects) router.get("/", authenticateToken, topic_in_subjectController.getAllTopic_in_subjects);
if (topic_in_subjectController.getTopic_in_subjectById) router.get("/:id", authenticateToken, topic_in_subjectController.getTopic_in_subjectById);
if (topic_in_subjectController.createTopic_in_subject) router.post("/", authenticateToken, topic_in_subjectController.createTopic_in_subject);
if (topic_in_subjectController.updateTopic_in_subject) router.put("/:id", authenticateToken, topic_in_subjectController.updateTopic_in_subject);
if (topic_in_subjectController.deleteTopic_in_subject) router.delete("/:id", authenticateToken, topic_in_subjectController.deleteTopic_in_subject);

// Fallback for standard methods
if (!topic_in_subjectController.getAllTopic_in_subjects && topic_in_subjectController.getAll) router.get("/", authenticateToken, topic_in_subjectController.getAll);
if (!topic_in_subjectController.getTopic_in_subjectById && topic_in_subjectController.getById) router.get("/:id", authenticateToken, topic_in_subjectController.getById);
if (!topic_in_subjectController.createTopic_in_subject && topic_in_subjectController.create) router.post("/", authenticateToken, topic_in_subjectController.create);
if (!topic_in_subjectController.updateTopic_in_subject && topic_in_subjectController.update) router.put("/:id", authenticateToken, topic_in_subjectController.update);
if (!topic_in_subjectController.deleteTopic_in_subject && topic_in_subjectController.delete) router.delete("/:id", authenticateToken, topic_in_subjectController.delete);

module.exports = router;
