const topicService = require("../services/topic_service.js");

// Basic CRUD functions
exports.getAll = async (req, res) => {
  try {
    const data = await topicService.getAll();
    res.status(200).json({
      success: true,
      message: "Topic records retrieved successfully",
      count: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving topic",
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await topicService.getById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Topic retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Topic not found",
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await topicService.create(req.body);
    res.status(201).json({
      success: true,
      message: "Topic created successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create topic",
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await topicService.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Topic updated successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update topic",
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await topicService.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Topic deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete topic",
      error: error.message
    });
  }
};

// Aliases for compatibility
exports.getAllTopics = exports.getAll;
exports.getTopicById = exports.getById;
exports.createTopic = exports.create;
exports.updateTopic = exports.update;
exports.deleteTopic = exports.delete;
