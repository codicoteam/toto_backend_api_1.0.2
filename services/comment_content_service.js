const Comment_content = require("../models/comment_content_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Comment_content.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch comment_content: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Comment_content.findById(id);
    if (!item) throw new Error("Comment_content not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch comment_content: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Comment_content(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create comment_content: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Comment_content.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Comment_content not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update comment_content: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Comment_content.findByIdAndDelete(id);
    if (!item) throw new Error("Comment_content not found");
    return { message: "Comment_content deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete comment_content: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllComment_contents = exports.getAll;
exports.getComment_contentById = exports.getById;
exports.createComment_content = exports.create;
exports.updateComment_content = exports.update;
exports.deleteComment_content = exports.delete;
