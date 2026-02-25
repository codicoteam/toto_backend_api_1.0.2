const express = require("express");
const router = express.Router();
const content_systemController = require("../controllers/content_system_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (content_systemController.loginContent_system) router.post("/login", content_systemController.loginContent_system);
if (content_systemController.registerContent_system) router.post("/register", content_systemController.registerContent_system);

// Protected endpoints (if they exist)
if (content_systemController.getAllContent_systems) router.get("/", authenticateToken, content_systemController.getAllContent_systems);
if (content_systemController.getContent_systemById) router.get("/:id", authenticateToken, content_systemController.getContent_systemById);
if (content_systemController.createContent_system) router.post("/", authenticateToken, content_systemController.createContent_system);
if (content_systemController.updateContent_system) router.put("/:id", authenticateToken, content_systemController.updateContent_system);
if (content_systemController.deleteContent_system) router.delete("/:id", authenticateToken, content_systemController.deleteContent_system);

// Fallback for standard methods
if (!content_systemController.getAllContent_systems && content_systemController.getAll) router.get("/", authenticateToken, content_systemController.getAll);
if (!content_systemController.getContent_systemById && content_systemController.getById) router.get("/:id", authenticateToken, content_systemController.getById);
if (!content_systemController.createContent_system && content_systemController.create) router.post("/", authenticateToken, content_systemController.create);
if (!content_systemController.updateContent_system && content_systemController.update) router.put("/:id", authenticateToken, content_systemController.update);
if (!content_systemController.deleteContent_system && content_systemController.delete) router.delete("/:id", authenticateToken, content_systemController.delete);

module.exports = router;
