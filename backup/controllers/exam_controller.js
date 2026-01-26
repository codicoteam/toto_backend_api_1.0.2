const examService = require("../services/exam_service.js");

// Create new exam
exports.createExam = async (req, res) => {
  try {
    if (req.user && req.user.type === 'teacher') {
      req.body.teacherId = req.user.id;
    }
    
    const newExam = await examService.createExam(req.body);
    
    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      data: newExam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create exam",
      error: error.message,
    });
  }
};

// Get all exams
exports.getAllExams = async (req, res) => {
  try {
    const filters = {};
    if (req.query.teacherId) filters.teacherId = req.query.teacherId;
    if (req.query.subject) filters.subject = req.query.subject;
    if (req.query.Topic) filters.Topic = req.query.Topic;
    if (req.query.level) filters.level = req.query.level;
    if (req.query.isPublished !== undefined) filters.isPublished = req.query.isPublished === 'true';
    
    const exams = await examService.getAllExams(filters);
    
    res.status(200).json({
      success: true,
      message: "Exams retrieved successfully",
      data: exams,
      count: exams.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve exams",
      error: error.message,
    });
  }
};

// Get exam by ID
exports.getExamById = async (req, res) => {
  try {
    const exam = await examService.getExamById(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Exam retrieved successfully",
      data: exam,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Exam not found",
      error: error.message,
    });
  }
};

// Update exam by ID
exports.updateExam = async (req, res) => {
  try {
    if (req.user.type === 'teacher') {
      const exam = await examService.getExamById(req.params.id);
      if (exam.teacherId && exam.teacherId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You can only update your own exams",
        });
      }
    }
    
    const updatedExam = await examService.updateExam(req.params.id, req.body);
    
    res.status(200).json({
      success: true,
      message: "Exam updated successfully",
      data: updatedExam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update exam",
      error: error.message,
    });
  }
};

// Delete exam by ID
exports.deleteExam = async (req, res) => {
  try {
    if (req.user.type === 'teacher') {
      const exam = await examService.getExamById(req.params.id);
      if (exam.teacherId && exam.teacherId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You can only delete your own exams",
        });
      }
    }
    
    await examService.deleteExam(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Exam deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete exam",
      error: error.message,
    });
  }
};

// Get exams by teacher ID
exports.getExamsByTeacherId = async (req, res) => {
  try {
    const exams = await examService.getExamsByTeacherId(req.params.teacherId);
    
    res.status(200).json({
      success: true,
      message: "Exams retrieved successfully",
      data: exams,
      count: exams.length,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "No exams found for this teacher",
      error: error.message,
    });
  }
};

// Publish exam
exports.publishExam = async (req, res) => {
  try {
    const exam = await examService.publishExam(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Exam published successfully",
      data: exam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to publish exam",
      error: error.message,
    });
  }
};

// Unpublish exam
exports.unpublishExam = async (req, res) => {
  try {
    const exam = await examService.unpublishExam(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Exam unpublished successfully",
      data: exam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to unpublish exam",
      error: error.message,
    });
  }
};

// Get exam statistics
exports.getExamStats = async (req, res) => {
  try {
    const stats = await examService.getExamStats(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Exam statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get exam statistics",
      error: error.message,
    });
  }
};

// Add question to exam
exports.addQuestion = async (req, res) => {
  try {
    const exam = await examService.addQuestion(req.params.id, req.body);
    
    res.status(200).json({
      success: true,
      message: "Question added successfully",
      data: exam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add question",
      error: error.message,
    });
  }
};

// Update question
exports.updateQuestion = async (req, res) => {
  try {
    const { examId, questionIndex } = req.params;
    const exam = await examService.updateQuestion(examId, parseInt(questionIndex), req.body);
    
    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      data: exam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update question",
      error: error.message,
    });
  }
};

// Delete question
exports.deleteQuestion = async (req, res) => {
  try {
    const { examId, questionIndex } = req.params;
    const exam = await examService.deleteQuestion(examId, parseInt(questionIndex));
    
    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
      data: exam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete question",
      error: error.message,
    });
  }
};

// Basic CRUD functions for router compatibility
exports.getAll = async (req, res) => {
  try {
    // TODO: Implement getAll logic
    res.status(200).json({
      success: true,
      message: "Get all endpoint",
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve data",
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    // TODO: Implement getById logic
    res.status(200).json({
      success: true,
      message: "Get by ID endpoint",
      data: { id: req.params.id }
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Data not found",
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    // TODO: Implement create logic
    res.status(201).json({
      success: true,
      message: "Create endpoint",
      data: req.body
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create data",
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    // TODO: Implement update logic
    res.status(200).json({
      success: true,
      message: "Update endpoint",
      data: { id: req.params.id, ...req.body }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update data",
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    // TODO: Implement delete logic
    res.status(200).json({
      success: true,
      message: "Delete endpoint"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete data",
      error: error.message
    });
  }
};
