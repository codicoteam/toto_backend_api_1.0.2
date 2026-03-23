const Comment_topic_content = require("../models/comment_topic_content_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Comment_topic_content.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch comment_topic_content: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Comment_topic_content.findById(id);
    if (!item) throw new Error("Comment_topic_content not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch comment_topic_content: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Comment_topic_content(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create comment_topic_content: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Comment_topic_content.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Comment_topic_content not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update comment_topic_content: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Comment_topic_content.findByIdAndDelete(id);
    if (!item) throw new Error("Comment_topic_content not found");
    return { message: "Comment_topic_content deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete comment_topic_content: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllComment_topic_contents = exports.getAll;
exports.getComment_topic_contentById = exports.getById;
exports.createComment_topic_content = exports.create;
exports.updateComment_topic_content = exports.update;
exports.deleteComment_topic_content = exports.delete;

// Get comments by topic content ID
exports.getByTopicContentId = async (topicContentId) => {
  try {
    const items = await Comment_topic_content.find({ topicId: topicContentId, isDeleted: false })
      .sort({ createdAt: -1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch comments by topic: " + error.message);
  }
};

// Delete comments by topic content ID
exports.deleteByTopicContentId = async (topicContentId) => {
  try {
    await Comment_topic_content.updateMany(
      { topicId: topicContentId },
      { isDeleted: true }
    );
    return { message: "Comments deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete comments by topic: " + error.message);
  }
};
