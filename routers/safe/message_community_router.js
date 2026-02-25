const express = require("express");
const router = express.Router();
const message_communityController = require("../controllers/message_community_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (message_communityController.loginMessage_community) router.post("/login", message_communityController.loginMessage_community);
if (message_communityController.registerMessage_community) router.post("/register", message_communityController.registerMessage_community);

// Protected endpoints (if they exist)
if (message_communityController.getAllMessage_communitys) router.get("/", authenticateToken, message_communityController.getAllMessage_communitys);
if (message_communityController.getMessage_communityById) router.get("/:id", authenticateToken, message_communityController.getMessage_communityById);
if (message_communityController.createMessage_community) router.post("/", authenticateToken, message_communityController.createMessage_community);
if (message_communityController.updateMessage_community) router.put("/:id", authenticateToken, message_communityController.updateMessage_community);
if (message_communityController.deleteMessage_community) router.delete("/:id", authenticateToken, message_communityController.deleteMessage_community);

// Fallback for standard methods
if (!message_communityController.getAllMessage_communitys && message_communityController.getAll) router.get("/", authenticateToken, message_communityController.getAll);
if (!message_communityController.getMessage_communityById && message_communityController.getById) router.get("/:id", authenticateToken, message_communityController.getById);
if (!message_communityController.createMessage_community && message_communityController.create) router.post("/", authenticateToken, message_communityController.create);
if (!message_communityController.updateMessage_community && message_communityController.update) router.put("/:id", authenticateToken, message_communityController.update);
if (!message_communityController.deleteMessage_community && message_communityController.delete) router.delete("/:id", authenticateToken, message_communityController.delete);

module.exports = router;
