const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (chatController.loginChat) router.post("/login", chatController.loginChat);
if (chatController.registerChat) router.post("/register", chatController.registerChat);

// Protected endpoints (if they exist)
if (chatController.getAllChats) router.get("/", authenticateToken, chatController.getAllChats);
if (chatController.getChatById) router.get("/:id", authenticateToken, chatController.getChatById);
if (chatController.createChat) router.post("/", authenticateToken, chatController.createChat);
if (chatController.updateChat) router.put("/:id", authenticateToken, chatController.updateChat);
if (chatController.deleteChat) router.delete("/:id", authenticateToken, chatController.deleteChat);

// Fallback for standard methods
if (!chatController.getAllChats && chatController.getAll) router.get("/", authenticateToken, chatController.getAll);
if (!chatController.getChatById && chatController.getById) router.get("/:id", authenticateToken, chatController.getById);
if (!chatController.createChat && chatController.create) router.post("/", authenticateToken, chatController.create);
if (!chatController.updateChat && chatController.update) router.put("/:id", authenticateToken, chatController.update);
if (!chatController.deleteChat && chatController.delete) router.delete("/:id", authenticateToken, chatController.delete);

module.exports = router;
