const Topic_in_subject = require("../models/topic_in_subject_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Topic_in_subject.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch topic_in_subject: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Topic_in_subject.findById(id);
    if (!item) throw new Error("Topic_in_subject not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch topic_in_subject: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Topic_in_subject(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create topic_in_subject: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Topic_in_subject.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Topic_in_subject not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update topic_in_subject: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Topic_in_subject.findByIdAndDelete(id);
    if (!item) throw new Error("Topic_in_subject not found");
    return { message: "Topic_in_subject deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete topic_in_subject: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllTopic_in_subjects = exports.getAll;
exports.getTopic_in_subjectById = exports.getById;
exports.createTopic_in_subject = exports.create;
exports.updateTopic_in_subject = exports.update;
exports.deleteTopic_in_subject = exports.delete;
