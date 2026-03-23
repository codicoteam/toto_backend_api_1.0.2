const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

// Login function for admin authentication
exports.login = async ({ email, password }) => {
  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error("Invalid email or password");
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin._id, 
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        role: "admin" 
      },
      process.env.JWT_SECRET || "your-secret-key-change-this",
      { expiresIn: "7d" }
    );
    
    // Return admin data without password
    const adminData = admin.toObject();
    delete adminData.password;
    
    return {
      token,
      admin: adminData
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Aliases for compatibility
exports.getAllAdmins = exports.getAll;
exports.getAdminById = exports.getById;
exports.createAdmin = exports.create;
exports.updateAdmin = exports.update;
exports.deleteAdmin = exports.delete;



// Reset password function
exports.resetPassword = async (email, newPassword) => {
  try {
    const Admin = require("../models/admin_model.js");
    const bcrypt = require("bcryptjs");
    
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error("Admin not found");
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    admin.password = hashedPassword;
    await admin.save();
    
    // Return success without password
    const adminData = admin.toObject();
    delete adminData.password;
    
    return {
      message: "Password reset successfully",
      admin: adminData
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
