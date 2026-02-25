const Admin = require("../models/admin_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Admin.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch admin: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Admin.findById(id);
    if (!item) throw new Error("Admin not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch admin: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Admin(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create admin: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Admin.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Admin not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update admin: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Admin.findByIdAndDelete(id);
    if (!item) throw new Error("Admin not found");
    return { message: "Admin deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete admin: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllAdmins = exports.getAll;
exports.getAdminById = exports.getById;
exports.createAdmin = exports.create;
exports.updateAdmin = exports.update;
exports.deleteAdmin = exports.delete;
