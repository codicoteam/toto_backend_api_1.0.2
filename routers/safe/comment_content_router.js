const express = require("express");
const router = express.Router();
const comment_contentController = require("../controllers/comment_content_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (comment_contentController.loginComment_content) router.post("/login", comment_contentController.loginComment_content);
if (comment_contentController.registerComment_content) router.post("/register", comment_contentController.registerComment_content);

// Protected endpoints (if they exist)
if (comment_contentController.getAllComment_contents) router.get("/", authenticateToken, comment_contentController.getAllComment_contents);
if (comment_contentController.getComment_contentById) router.get("/:id", authenticateToken, comment_contentController.getComment_contentById);
if (comment_contentController.createComment_content) router.post("/", authenticateToken, comment_contentController.createComment_content);
if (comment_contentController.updateComment_content) router.put("/:id", authenticateToken, comment_contentController.updateComment_content);
if (comment_contentController.deleteComment_content) router.delete("/:id", authenticateToken, comment_contentController.deleteComment_content);

// Fallback for standard methods
if (!comment_contentController.getAllComment_contents && comment_contentController.getAll) router.get("/", authenticateToken, comment_contentController.getAll);
if (!comment_contentController.getComment_contentById && comment_contentController.getById) router.get("/:id", authenticateToken, comment_contentController.getById);
if (!comment_contentController.createComment_content && comment_contentController.create) router.post("/", authenticateToken, comment_contentController.create);
if (!comment_contentController.updateComment_content && comment_contentController.update) router.put("/:id", authenticateToken, comment_contentController.update);
if (!comment_contentController.deleteComment_content && comment_contentController.delete) router.delete("/:id", authenticateToken, comment_contentController.delete);

module.exports = router;
