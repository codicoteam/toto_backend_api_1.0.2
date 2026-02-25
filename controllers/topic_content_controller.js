const topicContentService = require("../services/topic_content_service");

// Basic CRUD
exports.getAll = async (req, res) => {
  try {
    const data = await topicContentService.getAll();
    res.status(200).json({ success: true, message: "Contents retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await topicContentService.getById(req.params.id);
    res.status(200).json({ success: true, message: "Content retrieved", data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await topicContentService.create(req.body);
    res.status(201).json({ success: true, message: "Content created", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await topicContentService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Content updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await topicContentService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Content deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Additional methods
exports.getAllContents = exports.getAll;
exports.getContentById = exports.getById;
exports.createContent = exports.create;
exports.updateContent = exports.update;
exports.deleteContent = exports.delete;

exports.addLesson = async (req, res) => {
  try {
    const { contentId } = req.params;
    const data = await topicContentService.addLesson(contentId, req.body);
    res.status(201).json({ success: true, message: "Lesson added", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const { contentId, lessonId } = req.params;
    const data = await topicContentService.updateLesson(contentId, lessonId, req.body);
    res.status(200).json({ success: true, message: "Lesson updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const { contentId, lessonId } = req.params;
    await topicContentService.deleteLesson(contentId, lessonId);
    res.status(200).json({ success: true, message: "Lesson deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.reorderLessons = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { order } = req.body;
    const data = await topicContentService.reorderLessons(contentId, order);
    res.status(200).json({ success: true, message: "Lessons reordered", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getLeanContentByTopicId = async (req, res) => {
  try {
    const data = await topicContentService.getLeanByTopicId(req.params.topicId);
    res.status(200).json({ success: true, message: "Content retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getLessonInfo = async (req, res) => {
  try {
    const { contentId, lessonId } = req.params;
    const data = await topicContentService.getLessonInfo(contentId, lessonId);
    res.status(200).json({ success: true, message: "Lesson info retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
