const commentService = require("../services/comment_topic_content_service");

// Basic CRUD
exports.getAll = async (req, res) => {
  try {
    const data = await commentService.getAll();
    res.status(200).json({ success: true, message: "Comments retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await commentService.getById(req.params.id);
    res.status(200).json({ success: true, message: "Comment retrieved", data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await commentService.create(req.body);
    res.status(201).json({ success: true, message: "Comment created", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await commentService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Comment updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await commentService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Additional methods that match the router expectations
exports.createComment = exports.create;
exports.updateComment = exports.update;
exports.deleteComment = exports.delete;
exports.getAllComments = exports.getAll;
exports.getCommentById = exports.getById;

exports.getCommentsByTopicContentId = async (req, res) => {
  try {
    const data = await commentService.getByTopicContentId(req.params.topicContentId);
    res.status(200).json({ success: true, message: "Comments retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteCommentsByTopicContentId = async (req, res) => {
  try {
    await commentService.deleteByTopicContentId(req.params.topicContentId);
    res.status(200).json({ success: true, message: "Comments deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
