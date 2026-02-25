const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topic_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (topicController.loginTopic) router.post("/login", topicController.loginTopic);
if (topicController.registerTopic) router.post("/register", topicController.registerTopic);

// Protected endpoints (if they exist)
if (topicController.getAllTopics) router.get("/", authenticateToken, topicController.getAllTopics);
if (topicController.getTopicById) router.get("/:id", authenticateToken, topicController.getTopicById);
if (topicController.createTopic) router.post("/", authenticateToken, topicController.createTopic);
if (topicController.updateTopic) router.put("/:id", authenticateToken, topicController.updateTopic);
if (topicController.deleteTopic) router.delete("/:id", authenticateToken, topicController.deleteTopic);

// Fallback for standard methods
if (!topicController.getAllTopics && topicController.getAll) router.get("/", authenticateToken, topicController.getAll);
if (!topicController.getTopicById && topicController.getById) router.get("/:id", authenticateToken, topicController.getById);
if (!topicController.createTopic && topicController.create) router.post("/", authenticateToken, topicController.create);
if (!topicController.updateTopic && topicController.update) router.put("/:id", authenticateToken, topicController.update);
if (!topicController.deleteTopic && topicController.delete) router.delete("/:id", authenticateToken, topicController.delete);

module.exports = router;
