const questionService = require("../services/end_lesson_question_service");

// Basic CRUD
exports.getAll = async (req, res) => {
  try {
    const data = await questionService.getAll();
    res.status(200).json({ success: true, message: "Questions retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await questionService.getById(req.params.id);
    res.status(200).json({ success: true, message: "Question retrieved", data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await questionService.create(req.body);
    res.status(201).json({ success: true, message: "Question created", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await questionService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Question updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await questionService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Additional methods
exports.updateQuestion = exports.update;
exports.getQuestionsByTopicContentId = async (req, res) => {
  try {
    const data = await questionService.getByTopicContentId(req.params.topicContentId);
    res.status(200).json({ success: true, message: "Questions retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
