const teacher_student_chatService = require("../services/teacher_student_chat_service.js");

// Basic CRUD operations
exports.getAll = async (req, res) => {
  try {
    const data = await admin_student_chatService.getAll();
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: data
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
    const data = await admin_student_chatService.getById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: data
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
    const data = await admin_student_chatService.create(req.body);
    res.status(201).json({
      success: true,
      message: "Data created successfully",
      data: data
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
    const data = await admin_student_chatService.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: data
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
    await admin_student_chatService.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Data deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete data",
      error: error.message
    });
  }
};
