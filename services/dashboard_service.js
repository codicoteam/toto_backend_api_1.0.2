const Dashboard = require("../models/dashboard_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Dashboard.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch dashboard: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Dashboard.findById(id);
    if (!item) throw new Error("Dashboard not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch dashboard: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Dashboard(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create dashboard: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Dashboard.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Dashboard not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update dashboard: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Dashboard.findByIdAndDelete(id);
    if (!item) throw new Error("Dashboard not found");
    return { message: "Dashboard deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete dashboard: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllDashboards = exports.getAll;
exports.getDashboardById = exports.getById;
exports.createDashboard = exports.create;
exports.updateDashboard = exports.update;
exports.deleteDashboard = exports.delete;
