const contentService = require("../services/content_system_service");

// Basic CRUD
exports.getAll = async (req, res) => {
  try {
    const data = await contentService.getAll();
    res.status(200).json({ success: true, message: "Content retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await contentService.getById(req.params.id);
    res.status(200).json({ success: true, message: "Content retrieved", data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await contentService.create(req.body);
    res.status(201).json({ success: true, message: "Content created", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await contentService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Content updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await contentService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Content deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Additional methods
exports.getAllContent = exports.getAll;
exports.getContentById = exports.getById;
exports.createContent = exports.create;
exports.updateContent = exports.update;
exports.deleteContent = exports.delete;
