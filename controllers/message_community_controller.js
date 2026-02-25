const messageService = require("../services/message_community_service");

// Basic CRUD
exports.getAll = async (req, res) => {
  try {
    const data = await messageService.getAll();
    res.status(200).json({ success: true, message: "Messages retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await messageService.getById(req.params.id);
    res.status(200).json({ success: true, message: "Message retrieved", data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await messageService.create(req.body);
    res.status(201).json({ success: true, message: "Message sent", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await messageService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Message updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await messageService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Additional methods
exports.getMessageById = exports.getById;
exports.createMessage = exports.create;
exports.updateMessage = exports.update;
exports.deleteMessage = exports.delete;

exports.getMessagesByCommunityId = async (req, res) => {
  try {
    const data = await messageService.getByCommunityId(req.params.communityId);
    res.status(200).json({ success: true, message: "Messages retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getMessagesBySenderId = async (req, res) => {
  try {
    const data = await messageService.getBySenderId(req.params.senderId);
    res.status(200).json({ success: true, message: "Messages retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
