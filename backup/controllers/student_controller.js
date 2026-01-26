const studentService = require("../services/student_service.js");

// Register student
exports.registerStudent = async (req, res) => {
  try {
    const studentData = req.body;
    
    const newStudent = await studentService.createStudent(studentData);
    
    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: newStudent,
    });
  } catch (error) {
    if (error.message === "Email already exists") {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }
    res.status(400).json({
      success: false,
      message: "Error registering student",
      error: error.message
    });
  }
};

// Student login
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const student = await studentService.getStudentForAuth(email);
    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
    
    const isPasswordValid = await student.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
    
    const token = jwt.sign(
      { 
        id: student._id, 
        email: student.email, 
        type: 'student'
      },
      process.env.JWT_SECRET || 'toto_academy_2025',
      { expiresIn: process.env.JWT_EXPIRES_IN || '96h' }
    );
    
    const { password: _pw, __v, ...studentWithoutPassword } = student.toObject();
    
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: studentWithoutPassword,
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const filters = {};
    if (req.query.level) filters.level = req.query.level;
    if (req.query.subscription_status) filters.subscription_status = req.query.subscription_status;
    if (req.query.isPhoneVerified !== undefined) filters.isPhoneVerified = req.query.isPhoneVerified === 'true';
    
    const students = await studentService.getAllStudents(filters);
    
    res.status(200).json({
      success: true,
      message: "Students retrieved successfully",
      data: students,
      count: students.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving students",
      error: error.message,
    });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      data: student,
    });
  } catch (error) {
    if (error.message === "Student not found") {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    res.status(500).json({
      success: false,
      message: "Error retrieving student",
      error: error.message,
    });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    // Check if user is the student
    if (req.user.type === 'student' && req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own profile",
      });
    }
    
    const updatedStudent = await studentService.updateStudent(req.params.id, req.body);
    
    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    if (error.message === "Student not found") {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    res.status(400).json({
      success: false,
      message: "Error updating student",
      error: error.message,
    });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    await studentService.deleteStudent(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    if (error.message === "Student not found") {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    res.status(500).json({
      success: false,
      message: "Error deleting student",
      error: error.message,
    });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await studentService.generateAndSendPasswordResetOTP(email);
    
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Verify reset OTP
exports.verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await studentService.verifyPasswordResetOTP(email, otp);
    
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const result = await studentService.resetPassword(email, newPassword);
    
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get student progress
exports.getStudentProgress = async (req, res) => {
  try {
    const progress = await studentService.getStudentProgress(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Student progress retrieved successfully",
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving student progress",
      error: error.message,
    });
  }
};

// Update subscription status
exports.updateSubscription = async (req, res) => {
  try {
    if (req.user.type !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Only admins can update subscription status",
      });
    }
    
    const { id } = req.params;
    const { subscription_status } = req.body;
    
    const student = await studentService.updateSubscription(id, subscription_status);
    
    res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update subscription",
      error: error.message,
    });
  }
};

// Get student statistics
exports.getStudentStats = async (req, res) => {
  try {
    const stats = await studentService.getStudentStats(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Student statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving student statistics",
      error: error.message,
    });
  }
};

// Search students
exports.searchStudents = async (req, res) => {
  try {
    const { query } = req.query;
    
    const students = await studentService.searchStudents(query);
    
    res.status(200).json({
      success: true,
      message: "Students search results",
      data: students,
      count: students.length,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to search students",
      error: error.message,
    });
  }
};

// Get current student profile
exports.getCurrentStudent = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.user.id);
    
    res.status(200).json({
      success: true,
      message: "Current student profile retrieved successfully",
      data: student,
    });
  } catch (error) {
    if (error.message === "Student not found") {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    res.status(500).json({
      success: false,
      message: "Error retrieving profile",
      error: error.message,
    });
  }
};

// Update profile picture status
exports.updateProfilePictureStatus = async (req, res) => {
  try {
    if (req.user.type !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Only admins can update profile picture status",
      });
    }
    
    const { id } = req.params;
    const { profile_picture_status, profile_picture_rejection_reason } = req.body;
    
    const student = await studentService.updateProfilePictureStatus(
      id,
      profile_picture_status,
      profile_picture_rejection_reason
    );
    
    res.status(200).json({
      success: true,
      message: "Profile picture status updated successfully",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update profile picture status",
      error: error.message,
    });
  }
};

// Basic CRUD functions for router compatibility
exports.getAll = async (req, res) => {
  try {
    // TODO: Implement getAll logic
    res.status(200).json({
      success: true,
      message: "Get all endpoint",
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve data",
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    // TODO: Implement getById logic
    res.status(200).json({
      success: true,
      message: "Get by ID endpoint",
      data: { id: req.params.id }
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Data not found",
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    // TODO: Implement create logic
    res.status(201).json({
      success: true,
      message: "Create endpoint",
      data: req.body
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create data",
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    // TODO: Implement update logic
    res.status(200).json({
      success: true,
      message: "Update endpoint",
      data: { id: req.params.id, ...req.body }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update data",
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    // TODO: Implement delete logic
    res.status(200).json({
      success: true,
      message: "Delete endpoint"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete data",
      error: error.message
    });
  }
};
