const adminService = require("../services/admin_service.js");

// Basic CRUD functions
exports.getAll = async (req, res) => {
  try {
    const data = await adminService.getAll();
    res.status(200).json({
      success: true,
      message: "Admins retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve admins",
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await adminService.getById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Admin retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Admin not found",
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await adminService.create(req.body);
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create admin",
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await adminService.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update admin",
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await adminService.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Admin deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete admin",
      error: error.message
    });
  }
};

// Additional admin functions
exports.registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password, contactNumber, profilePicture } = req.body;
    
    // Validate required fields
    const missingFields = [];
    if (!firstName) missingFields.push('firstName');
    if (!lastName) missingFields.push('lastName');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!contactNumber) missingFields.push('contactNumber');
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }
    
    // Check if admin already exists
    const existingAdmin = await adminService.getAdminByEmail(email);
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin with this email already exists"
      });
    }
    
    // Prepare admin data with default profile picture if not provided
    const adminData = {
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      profilePicture: profilePicture || "https://default-avatar.com/default.png"
    };
    
    const admin = await adminService.create(adminData);
    
    // Don't send password back
    const adminResponse = admin.toObject ? admin.toObject() : admin;
    delete adminResponse.password;
    
    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: adminResponse
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to register admin",
      error: error.message
    });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }
    
    const result = await adminService.login(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Login failed",
      error: error.message
    });
  }
};

// Alias for login (for router compatibility)
exports.login = exports.loginAdmin;

exports.getAdminById = async (req, res) => {
  try {
    const admin = await adminService.getById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Admin retrieved successfully",
      data: admin
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Admin not found",
      error: error.message
    });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await adminService.getAll();
    res.status(200).json({
      success: true,
      message: "Admins retrieved successfully",
      data: admins
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve admins",
      error: error.message
    });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const admin = await adminService.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: admin
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update admin",
      error: error.message
    });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    await adminService.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Admin deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete admin",
      error: error.message
    });
  }
};
