const subjectService = require("../services/subject_service");

exports.getAllSubjects = async (req, res) => {
  try {
    const data = await subjectService.getAll();
    res.status(200).json({
      success: true,
      message: "Subjects retrieved successfully",
      count: data.length,
      data: data
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
    const data = await subjectService.getById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Subject retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Subject not found",
      error: error.message
    });
  }
};

exports.createSubject = async (req, res) => {
  try {
    const data = await subjectService.create(req.body);
    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create subject",
      error: error.message
    });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const data = await subjectService.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      data: data
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
    const result = await subjectService.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: result.message || "Subject deleted successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete subject",
      error: error.message
    });
  }
};
