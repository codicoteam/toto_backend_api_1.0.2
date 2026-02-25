const Topic_content = require("../models/topic_content_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Topic_content.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch topic_content: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Topic_content.findById(id);
    if (!item) throw new Error("Topic_content not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch topic_content: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Topic_content(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create topic_content: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Topic_content.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Topic_content not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update topic_content: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Topic_content.findByIdAndDelete(id);
    if (!item) throw new Error("Topic_content not found");
    return { message: "Topic_content deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete topic_content: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllTopic_contents = exports.getAll;
exports.getTopic_contentById = exports.getById;
exports.createTopic_content = exports.create;
exports.updateTopic_content = exports.update;
exports.deleteTopic_content = exports.delete;
