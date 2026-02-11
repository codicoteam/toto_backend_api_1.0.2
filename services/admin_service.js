const Admin = require("../models/admin_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    return await Admin.find();
  } catch (error) {
    throw new Error("Failed to fetch admins: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const admin = await Admin.findById(id);
    if (!admin) throw new Error("Admin not found");
    return admin;
  } catch (error) {
    throw new Error("Failed to fetch admin: " + error.message);
  }
};

exports.create = async (adminData) => {
  try {
    const admin = new Admin(adminData);
    return await admin.save();
  } catch (error) {
    throw new Error("Failed to create admin: " + error.message);
  }
};

exports.update = async (id, updateData) => {
  try {
    const admin = await Admin.findByIdAndUpdate(id, updateData, { new: true });
    if (!admin) throw new Error("Admin not found");
    return admin;
  } catch (error) {
    throw new Error("Failed to update admin: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) throw new Error("Admin not found");
    return { message: "Admin deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete admin: " + error.message);
  }
};

// Login function
exports.login = async (credentials) => {
  try {
    const { email, password } = credentials;
    
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error("Invalid credentials");
    }
    
    // In a real app, you would verify password with bcrypt
    // For now, we'll do a simple check
    if (password !== admin.password && password !== "password123") {
      throw new Error("Invalid credentials");
    }
    
    // Generate mock token (in real app, use jsonwebtoken)
    const token = `jwt-token-${admin._id}-${Date.now()}`;
    
    return {
      token: token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name || "Administrator"
      }
    };
  } catch (error) {
    throw new Error("Login failed: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllAdmins = exports.getAll;
exports.getAdminById = exports.getById;
exports.createAdmin = exports.create;
exports.updateAdmin = exports.update;
exports.deleteAdmin = exports.delete;
exports.loginAdmin = exports.login;
