const chatService = require("../services/chat_service.js");

// Basic CRUD functions
exports.getAll = async (req, res) => {
  try {
    const data = await chatService.getAll();
    res.status(200).json({
      success: true,
      message: "Chat records retrieved successfully",
      count: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving chat",
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await chatService.getById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Chat retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Chat not found",
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await chatService.create(req.body);
    res.status(201).json({
      success: true,
      message: "Chat created successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create chat",
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await chatService.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Chat updated successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update chat",
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await chatService.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Chat deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete chat",
      error: error.message
    });
  }
};

// Aliases for compatibility
exports.getAllChats = exports.getAll;
exports.getChatById = exports.getById;
exports.createChat = exports.create;
exports.updateChat = exports.update;
exports.deleteChat = exports.delete;
