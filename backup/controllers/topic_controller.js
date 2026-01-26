const topicService = require("../services/topic_in_subject_service");

exports.createTopic = async (req, res) => {
  try {
    const topic = await topicService.createTopic(req.body);
    res.status(201).json({
      success: true,
      message: "Topic created successfully",
      data: topic
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create topic",
      error: error.message
    });
  }
};

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await topicService.getAllTopics();
    res.status(200).json({
      success: true,
      message: "Topics retrieved successfully",
      data: topics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve topics",
      error: error.message
    });
  }
};

exports.getTopicById = async (req, res) => {
  try {
    const topic = await topicService.getTopicById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Topic retrieved successfully",
      data: topic
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Topic not found",
      error: error.message
    });
  }
};

exports.updateTopic = async (req, res) => {
  try {
    const topic = await topicService.updateTopic(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Topic updated successfully",
      data: topic
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update topic",
      error: error.message
    });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    await topicService.deleteTopic(req.params.id);
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

exports.getTopicsBySubject = async (req, res) => {
  try {
    const topics = await topicService.getTopicsBySubject(req.params.subjectId);
    res.status(200).json({
      success: true,
      message: "Topics retrieved successfully",
      data: topics
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "No topics found for this subject",
      error: error.message
    });
  }
};
