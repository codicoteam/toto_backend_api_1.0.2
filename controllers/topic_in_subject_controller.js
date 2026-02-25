const topicService = require("../services/topic_in_subject_service");

// Basic CRUD
exports.getAll = async (req, res) => {
  try {
    const data = await topicService.getAll();
    res.status(200).json({ success: true, message: "Topics retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await topicService.getById(req.params.id);
    res.status(200).json({ success: true, message: "Topic retrieved", data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await topicService.create(req.body);
    res.status(201).json({ success: true, message: "Topic created", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await topicService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Topic updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await topicService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Topic deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Additional methods
exports.getAllTopics = exports.getAll;
exports.getTopicById = exports.getById;
exports.createTopic = exports.create;
exports.updateTopic = exports.update;
exports.deleteTopic = exports.delete;

exports.getTopicsBySubjectId = async (req, res) => {
  try {
    const data = await topicService.getBySubjectId(req.params.subjectId);
    res.status(200).json({ success: true, message: "Topics retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.toggleVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { showTopic } = req.body;
    const data = await topicService.toggleVisibility(id, showTopic);
    res.status(200).json({ success: true, message: "Visibility updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
