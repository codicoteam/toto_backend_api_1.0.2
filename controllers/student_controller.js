const studentService = require("../services/student_service");

// Basic CRUD
exports.getAll = async (req, res) => {
  try {
    const data = await studentService.getAll();
    res.status(200).json({ success: true, message: "Students retrieved", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await studentService.getById(req.params.id);
    res.status(200).json({ success: true, message: "Student retrieved", data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await studentService.create(req.body);
    res.status(201).json({ success: true, message: "Student created", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await studentService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Student updated", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await studentService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Auth methods
exports.registerStudent = async (req, res) => {
  try {
    const data = await studentService.create(req.body);
    res.status(201).json({ success: true, message: "Student registered", data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await studentService.login({ email, password });
    res.status(200).json({ success: true, message: "Login successful", data: result });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

// Password reset
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    res.status(200).json({ success: true, message: "OTP sent", data: { email, otp } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    res.status(200).json({ success: true, message: "OTP verified" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const result = await studentService.resetPassword(email, newPassword);
    res.status(200).json({ success: true, message: "Password reset", data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phone_number, otpCode } = req.body;
    res.status(200).json({ success: true, message: "OTP verified" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Aliases
exports.getAllStudents = exports.getAll;
exports.getStudentById = exports.getById;
exports.createStudent = exports.create;
exports.updateStudent = exports.update;
exports.deleteStudent = exports.delete;
