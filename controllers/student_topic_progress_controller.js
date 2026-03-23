const progressService = require("../services/student_topic_progress_service.js");

// Basic CRUD functions
exports.getAll = async (req, res) => {
  try {
    const data = await progressService.getAll();
    res.status(200).json({
      success: true,
      message: "Progress records retrieved successfully",
      count: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving progress records",
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await progressService.getById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Progress record retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Progress record not found",
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await progressService.create(req.body);
    res.status(201).json({
      success: true,
      message: "Progress record created successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create progress record",
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await progressService.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Progress record updated successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update progress record",
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await progressService.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Progress record deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete progress record",
      error: error.message
    });
  }
};

// Additional methods
exports.getAllProgress = exports.getAll;
exports.getProgressById = exports.getById;
exports.createProgress = exports.create;
exports.updateProgress = exports.update;
exports.deleteProgress = exports.delete;

exports.getByStudentId = async (req, res) => {
  try {
    const data = await progressService.getByStudentId(req.params.studentId);
    res.status(200).json({
      success: true,
      message: "Student progress retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve student progress",
      error: error.message
    });
  }
};

exports.getByTopicId = async (req, res) => {
  try {
    const data = await progressService.getByTopicId(req.params.topicId);
    res.status(200).json({
      success: true,
      message: "Topic progress retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve topic progress",
      error: error.message
    });
  }
};

exports.getStudentTopicProgress = async (req, res) => {
  try {
    const { studentId, topicId } = req.params;
    const data = await progressService.getStudentTopicProgress(studentId, topicId);
    res.status(200).json({
      success: true,
      message: "Student topic progress retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve student topic progress",
      error: error.message
    });
  }
};

exports.getStudentProgressSummary = async (req, res) => {
  try {
    const data = await progressService.getStudentProgressSummary(req.params.studentId);
    res.status(200).json({
      success: true,
      message: "Student progress summary retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve student progress summary",
      error: error.message
    });
  }
};

exports.updateStudentProgress = async (req, res) => {
  try {
    const { studentId, topicId } = req.params;
    const data = await progressService.updateProgress(studentId, topicId, req.body);
    res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update progress",
      error: error.message
    });
  }
};
