const Topic = require("../models/topic_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Topic.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch topic: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Topic.findById(id);
    if (!item) throw new Error("Topic not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch topic: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Topic(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create topic: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Topic.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Topic not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update topic: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Topic.findByIdAndDelete(id);
    if (!item) throw new Error("Topic not found");
    return { message: "Topic deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete topic: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllTopics = exports.getAll;
exports.getTopicById = exports.getById;
exports.createTopic = exports.create;
exports.updateTopic = exports.update;
exports.deleteTopic = exports.delete;
