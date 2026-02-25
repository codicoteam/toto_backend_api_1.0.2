const home_bannerService = require("../services/home_banner_service.js");

// Basic CRUD functions
exports.getAll = async (req, res) => {
  try {
    const data = await home_bannerService.getAll();
    res.status(200).json({
      success: true,
      message: "Home_banner records retrieved successfully",
      count: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving home_banner",
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await home_bannerService.getById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Home_banner retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Home_banner not found",
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await home_bannerService.create(req.body);
    res.status(201).json({
      success: true,
      message: "Home_banner created successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create home_banner",
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await home_bannerService.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Home_banner updated successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update home_banner",
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await home_bannerService.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Home_banner deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete home_banner",
      error: error.message
    });
  }
};

// Aliases for compatibility
exports.getAllHome_banners = exports.getAll;
exports.getHome_bannerById = exports.getById;
exports.createHome_banner = exports.create;
exports.updateHome_banner = exports.update;
exports.deleteHome_banner = exports.delete;
