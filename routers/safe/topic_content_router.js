const express = require("express");
const router = express.Router();
const topic_contentController = require("../controllers/topic_content_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (topic_contentController.loginTopic_content) router.post("/login", topic_contentController.loginTopic_content);
if (topic_contentController.registerTopic_content) router.post("/register", topic_contentController.registerTopic_content);

// Protected endpoints (if they exist)
if (topic_contentController.getAllTopic_contents) router.get("/", authenticateToken, topic_contentController.getAllTopic_contents);
if (topic_contentController.getTopic_contentById) router.get("/:id", authenticateToken, topic_contentController.getTopic_contentById);
if (topic_contentController.createTopic_content) router.post("/", authenticateToken, topic_contentController.createTopic_content);
if (topic_contentController.updateTopic_content) router.put("/:id", authenticateToken, topic_contentController.updateTopic_content);
if (topic_contentController.deleteTopic_content) router.delete("/:id", authenticateToken, topic_contentController.deleteTopic_content);

// Fallback for standard methods
if (!topic_contentController.getAllTopic_contents && topic_contentController.getAll) router.get("/", authenticateToken, topic_contentController.getAll);
if (!topic_contentController.getTopic_contentById && topic_contentController.getById) router.get("/:id", authenticateToken, topic_contentController.getById);
if (!topic_contentController.createTopic_content && topic_contentController.create) router.post("/", authenticateToken, topic_contentController.create);
if (!topic_contentController.updateTopic_content && topic_contentController.update) router.put("/:id", authenticateToken, topic_contentController.update);
if (!topic_contentController.deleteTopic_content && topic_contentController.delete) router.delete("/:id", authenticateToken, topic_contentController.delete);

module.exports = router;
