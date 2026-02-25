const comment_contentService = require("../services/comment_content_service.js");

// Basic CRUD functions
exports.getAll = async (req, res) => {
  try {
    const data = await comment_contentService.getAll();
    res.status(200).json({
      success: true,
      message: "Comment_content records retrieved successfully",
      count: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving comment_content",
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await comment_contentService.getById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Comment_content retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Comment_content not found",
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await comment_contentService.create(req.body);
    res.status(201).json({
      success: true,
      message: "Comment_content created successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create comment_content",
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await comment_contentService.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Comment_content updated successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update comment_content",
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await comment_contentService.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Comment_content deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete comment_content",
      error: error.message
    });
  }
};

// Aliases for compatibility
exports.getAllComment_contents = exports.getAll;
exports.getComment_contentById = exports.getById;
exports.createComment_content = exports.create;
exports.updateComment_content = exports.update;
exports.deleteComment_content = exports.delete;
