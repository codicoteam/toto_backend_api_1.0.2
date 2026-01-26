const subjectService = require("../services/subject_service.js");

exports.createSubject = async (req, res) => {
  try {
    const subject = await subjectService.createSubject(req.body);
    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: subject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create subject",
      error: error.message
    });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json({
      success: true,
      message: "Subjects retrieved successfully",
      data: subjects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve subjects",
      error: error.message
    });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const subject = await subjectService.getSubjectById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Subject retrieved successfully",
      data: subject
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Subject not found",
      error: error.message
    });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const subject = await subjectService.updateSubject(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      data: subject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update subject",
      error: error.message
    });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    await subjectService.deleteSubject(req.params.id);
    res.status(200).json({
      success: true,
      message: "Subject deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete subject",
      error: error.message
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
