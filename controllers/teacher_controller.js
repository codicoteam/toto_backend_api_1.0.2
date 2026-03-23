const teacherService = require("../services/teacher_service");

// Basic CRUD
exports.getAll = async (req, res) => {
  try {
    const data = await teacherService.getAll();
    res.status(200).json({ success: true, message: "Teachers retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await teacherService.getById(req.params.id);
    res.status(200).json({ success: true, message: "Teacher retrieved", data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await teacherService.create(req.body);
    res.status(201).json({ success: true, message: "Teacher created", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await teacherService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Teacher updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await teacherService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Teacher deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Auth methods
exports.registerTeacher = async (req, res) => {
  try {
    const data = await teacherService.create(req.body);
    res.status(201).json({ success: true, message: "Teacher registered", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await teacherService.login({ email, password });
    res.status(200).json({ success: true, message: "Login successful", data: result });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

// Aliases
exports.getAllTeachers = exports.getAll;
exports.getTeacherById = exports.getById;
exports.createTeacher = exports.create;
exports.updateTeacher = exports.update;
exports.deleteTeacher = exports.delete;

// Password reset methods
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await teacherService.forgotPassword(email);
    res.status(200).json({
      success: true,
      message: "Password reset OTP sent to email",
      data: result
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await teacherService.verifyOTP(email, otp);
    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "OTP verification failed",
      error: error.message
    });
  }
};

exports.verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await teacherService.verifyOTP(email, otp);
    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "OTP verification failed",
      error: error.message
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    
    // Use the OTP-verified reset method
    const result = await teacherService.resetPasswordWithOTP(email, otp, newPassword);
    
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to reset password",
      error: error.message
    });
  }
};

exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await teacherService.resendOTP(email);
    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to resend OTP",
      error: error.message
    });
  }
};
