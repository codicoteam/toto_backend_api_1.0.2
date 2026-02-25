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

// Auth methods
exports.registerAdmin = async (req, res) => {
  try {
    const data = await adminService.create(req.body);
    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: data
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
    const result = await adminService.login({ email, password });
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

// Password reset methods
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Generate OTP and send email
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Store OTP in database or cache
    res.status(200).json({
      success: true,
      message: "Password reset OTP sent to email",
      data: { email, otp } // Remove otp in production
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message
    });
  }
};

exports.verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    // Verify OTP from database/cache
    const isValid = true; // Implement actual verification
    if (isValid) {
      res.status(200).json({
        success: true,
        message: "OTP verified successfully"
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
      error: error.message
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    // Verify OTP and update password
    const result = await adminService.resetPassword(email, newPassword);
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reset password",
      error: error.message
    });
  }
};

// Aliases
exports.getAllAdmins = exports.getAll;
exports.getAdminById = exports.getById;
exports.createAdmin = exports.create;
exports.updateAdmin = exports.update;
exports.deleteAdmin = exports.delete;
