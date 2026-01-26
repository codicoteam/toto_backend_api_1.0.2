const dashboardService = require("../services/dashboard_service.js");

exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.status(200).json({
      success: true,
      message: "Dashboard stats retrieved successfully",
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard stats",
      error: error.message
    });
  }
};

// Add missing functions for router compatibility
exports.getAll = async (req, res) => {
  try {
    const stats = await exports.getDashboardStats(req, res);
    return stats;
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get dashboard data",
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Dashboard stats by ID endpoint",
    data: { id: req.params.id }
  });
};

exports.create = async (req, res) => {
  res.status(201).json({
    success: true,
    message: "Create dashboard endpoint",
    data: req.body
  });
};

exports.update = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Update dashboard endpoint",
    data: { id: req.params.id, ...req.body }
  });
};

exports.delete = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Delete dashboard endpoint"
  });
};
