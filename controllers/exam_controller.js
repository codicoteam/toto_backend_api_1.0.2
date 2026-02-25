const examService = require("../services/exam_service.js");

// Basic CRUD functions
exports.getAll = async (req, res) => {
  try {
    const data = await examService.getAll();
    res.status(200).json({
      success: true,
      message: "Exam records retrieved successfully",
      count: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving exam",
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await examService.getById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Exam retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Exam not found",
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await examService.create(req.body);
    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create exam",
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await examService.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Exam updated successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update exam",
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await examService.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Exam deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete exam",
      error: error.message
    });
  }
};

// Aliases for compatibility
exports.getAllExams = exports.getAll;
exports.getExamById = exports.getById;
exports.createExam = exports.create;
exports.updateExam = exports.update;
exports.deleteExam = exports.delete;
