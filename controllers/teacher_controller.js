const teacherService = require("../services/teacher_service.js");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "toto_academy_2025";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "96h";

// Teacher registration
exports.registerTeacher = async (req, res) => {
  try {
    const teacherData = req.body;
    
    // Default role to teacher if not specified
    if (!teacherData.role) {
      teacherData.role = "teacher";
    }
    
    const newTeacher = await teacherService.createTeacher(teacherData);
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: newTeacher._id, 
        email: newTeacher.email, 
        role: newTeacher.role,
        type: 'teacher'
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    res.status(201).json({
      success: true,
      message: "Teacher registered successfully",
      data: newTeacher,
      token
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
      message: "Error registering teacher",
      error: error.message
    });
  }
};

// Teacher login
exports.loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const teacher = await teacherService.getTeacherForAuth(email);
    if (!teacher || !teacher.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials or account inactive"
      });
    }
    
    const isPasswordValid = await teacher.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
    
    const token = jwt.sign(
      { 
        id: teacher._id, 
        email: teacher.email, 
        role: teacher.role,
        type: 'teacher'
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    const { password: _pw, __v, ...teacherWithoutPassword } = teacher.toObject();
    
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: teacherWithoutPassword,
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

// Get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const filters = {};
    if (req.query.isActive) filters.isActive = req.query.isActive === 'true';
    if (req.query.specialization) filters.specialization = req.query.specialization.split(',');
    
    const teachers = await teacherService.getAllTeachers(filters);
    
    res.status(200).json({
      success: true,
      message: "Teachers retrieved successfully",
      data: teachers,
      count: teachers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving teachers",
      error: error.message
    });
  }
};

// Get teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await teacherService.getTeacherById(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Teacher retrieved successfully",
      data: teacher
    });
  } catch (error) {
    if (error.message === "Teacher not found") {
      return res.status(404).json({
        success: false,
        message: "Teacher not found"
      });
    }
    res.status(500).json({
      success: false,
      message: "Error retrieving teacher",
      error: error.message
    });
  }
};

// Update teacher profile
exports.updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await teacherService.updateTeacher(
      req.params.id, 
      req.body, 
      req.user
    );
    
    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      data: updatedTeacher
    });
  } catch (error) {
    if (error.message === "Teacher not found") {
      return res.status(404).json({
        success: false,
        message: "Teacher not found"
      });
    }
    if (error.message === "You can only update your own profile") {
      return res.status(403).json({
        success: false,
        message: error.message
      });
    }
    res.status(400).json({
      success: false,
      message: "Error updating teacher",
      error: error.message
    });
  }
};

// Delete teacher (soft delete)
exports.deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await teacherService.deleteTeacher(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Teacher deactivated successfully",
      data: deletedTeacher
    });
  } catch (error) {
    if (error.message === "Teacher not found") {
      return res.status(404).json({
        success: false,
        message: "Teacher not found"
      });
    }
    res.status(500).json({
      success: false,
      message: "Error deactivating teacher",
      error: error.message
    });
  }
};

// Activate teacher
exports.activateTeacher = async (req, res) => {
  try {
    const activatedTeacher = await teacherService.activateTeacher(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Teacher activated successfully",
      data: activatedTeacher
    });
  } catch (error) {
    if (error.message === "Teacher not found") {
      return res.status(404).json({
        success: false,
        message: "Teacher not found"
      });
    }
    res.status(500).json({
      success: false,
      message: "Error activating teacher",
      error: error.message
    });
  }
};

// Forgot password - request OTP
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await teacherService.generateAndSendPasswordResetOTP(email);
    
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

// Verify password reset OTP
exports.verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await teacherService.verifyPasswordResetOTP(email, otp);
    
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
    const result = await teacherService.resetPassword(email, newPassword);
    
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

// Get teacher statistics
exports.getTeacherStats = async (req, res) => {
  try {
    const stats = await teacherService.getTeacherStats(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Teacher statistics retrieved successfully",
      data: stats
    });
  } catch (error) {
    if (error.message === "Teacher not found") {
      return res.status(404).json({
        success: false,
        message: "Teacher not found"
      });
    }
    res.status(500).json({
      success: false,
      message: "Error retrieving teacher statistics",
      error: error.message
    });
  }
};

// Get current teacher profile
exports.getCurrentTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.getTeacherById(req.user.id);
    
    res.status(200).json({
      success: true,
      message: "Current teacher profile retrieved successfully",
      data: teacher
    });
  } catch (error) {
    if (error.message === "Teacher not found") {
      return res.status(404).json({
        success: false,
        message: "Teacher not found"
      });
    }
    res.status(500).json({
      success: false,
      message: "Error retrieving profile",
      error: error.message
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
