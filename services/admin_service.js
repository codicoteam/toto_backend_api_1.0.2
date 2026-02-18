const Admin = require("../models/admin_model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    return await Admin.find().select('-password');
  } catch (error) {
    throw new Error("Failed to fetch admins: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const admin = await Admin.findById(id).select('-password');
    if (!admin) throw new Error("Admin not found");
    return admin;
  } catch (error) {
    throw new Error("Failed to fetch admin: " + error.message);
  }
};

exports.create = async (adminData) => {
  try {
    const admin = new Admin(adminData);
    const savedAdmin = await admin.save();
    
    // Return admin without password
    const adminObj = savedAdmin.toObject();
    delete adminObj.password;
    return adminObj;
  } catch (error) {
    throw new Error("Failed to create admin: " + error.message);
  }
};

exports.update = async (id, updateData) => {
  try {
    // If password is being updated, it will be hashed by the model's pre hook
    const admin = await Admin.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
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

// Login function with proper password verification
exports.login = async (credentials) => {
  try {
    const { email, password } = credentials;
    
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    
    // Find admin by email and include password field
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      throw new Error("Invalid credentials");
    }
    
    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin._id, 
        email: admin.email,
        role: 'admin'
      }, 
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: '24h' }
    );
    
    // Return admin without password
    const adminObj = admin.toObject();
    delete adminObj.password;
    
    return {
      token,
      admin: adminObj
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
exports.loginAdmin = exports.login;

// Get admin by email (for registration check)
exports.getAdminByEmail = async (email) => {
  try {
    return await Admin.findOne({ email });
  } catch (error) {
    console.log("Error finding admin by email:", error.message);
    return null;
  }
};
