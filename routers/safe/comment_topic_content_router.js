const express = require("express");
const router = express.Router();
const comment_topic_contentController = require("../controllers/comment_topic_content_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (comment_topic_contentController.loginComment_topic_content) router.post("/login", comment_topic_contentController.loginComment_topic_content);
if (comment_topic_contentController.registerComment_topic_content) router.post("/register", comment_topic_contentController.registerComment_topic_content);

// Protected endpoints (if they exist)
if (comment_topic_contentController.getAllComment_topic_contents) router.get("/", authenticateToken, comment_topic_contentController.getAllComment_topic_contents);
if (comment_topic_contentController.getComment_topic_contentById) router.get("/:id", authenticateToken, comment_topic_contentController.getComment_topic_contentById);
if (comment_topic_contentController.createComment_topic_content) router.post("/", authenticateToken, comment_topic_contentController.createComment_topic_content);
if (comment_topic_contentController.updateComment_topic_content) router.put("/:id", authenticateToken, comment_topic_contentController.updateComment_topic_content);
if (comment_topic_contentController.deleteComment_topic_content) router.delete("/:id", authenticateToken, comment_topic_contentController.deleteComment_topic_content);

// Fallback for standard methods
if (!comment_topic_contentController.getAllComment_topic_contents && comment_topic_contentController.getAll) router.get("/", authenticateToken, comment_topic_contentController.getAll);
if (!comment_topic_contentController.getComment_topic_contentById && comment_topic_contentController.getById) router.get("/:id", authenticateToken, comment_topic_contentController.getById);
if (!comment_topic_contentController.createComment_topic_content && comment_topic_contentController.create) router.post("/", authenticateToken, comment_topic_contentController.create);
if (!comment_topic_contentController.updateComment_topic_content && comment_topic_contentController.update) router.put("/:id", authenticateToken, comment_topic_contentController.update);
if (!comment_topic_contentController.deleteComment_topic_content && comment_topic_contentController.delete) router.delete("/:id", authenticateToken, comment_topic_contentController.delete);

module.exports = router;
