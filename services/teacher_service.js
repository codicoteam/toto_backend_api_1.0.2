const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Teacher = require("../models/teacher_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Teacher.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch teacher: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Teacher.findById(id);
    if (!item) throw new Error("Teacher not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch teacher: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Teacher(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create teacher: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Teacher.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Teacher not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update teacher: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Teacher.findByIdAndDelete(id);
    if (!item) throw new Error("Teacher not found");
    return { message: "Teacher deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete teacher: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllTeachers = exports.getAll;
exports.getTeacherById = exports.getById;
exports.createTeacher = exports.create;
exports.updateTeacher = exports.update;
exports.deleteTeacher = exports.delete;


// Login function for teacher authentication
exports.login = async ({ email, password }) => {
  try {
    const Teacher = require("../models/teacher_model.js");
    
    // Find teacher by email
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      throw new Error("Invalid email or password");
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, teacher.password);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: teacher._id, 
        email: teacher.email,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        role: "teacher" 
      },
      process.env.JWT_SECRET || "your-secret-key-change-this",
      { expiresIn: "7d" }
    );
    
    // Return teacher data without password
    const teacherData = teacher.toObject();
    delete teacherData.password;
    
    return {
      token,
      teacher: teacherData
    };
  } catch (error) {
    throw new Error(error.message);
  }
};


// Reset password function
exports.resetPassword = async (email, newPassword) => {
  try {
    const Teacher = require("../models/teacher_model.js");
    
    // Find teacher by email
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    teacher.password = hashedPassword;
    await teacher.save();
    
    // Return success without password
    const teacherData = teacher.toObject();
    delete teacherData.password;
    
    return {
      message: "Password reset successfully",
      teacher: teacherData
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Simple in-memory OTP store (in production, use Redis or database)
const otpStore = {};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Forgot password - generate and store OTP
exports.forgotPassword = async (email) => {
  try {
    const Teacher = require("../models/teacher_model.js");
    
    // Check if teacher exists
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      throw new Error("No account found with this email");
    }
    
    // Generate OTP
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    // Store OTP (in production, use Redis or database)
    otpStore[email] = {
      otp,
      expiresAt,
      attempts: 0
    };
    
    // Here you would send email with OTP
    console.log(`OTP for ${email}: ${otp}`); // For development
    
    return {
      message: "OTP sent successfully",
      email,
      // Remove in production - only for testing
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Verify OTP
exports.verifyOTP = async (email, otp) => {
  try {
    const storedData = otpStore[email];
    
    if (!storedData) {
      throw new Error("No OTP found for this email");
    }
    
    // Check attempts
    if (storedData.attempts >= 3) {
      delete otpStore[email];
      throw new Error("Too many failed attempts. Please request a new OTP");
    }
    
    // Check expiry
    if (Date.now() > storedData.expiresAt) {
      delete otpStore[email];
      throw new Error("OTP has expired");
    }
    
    // Verify OTP
    if (storedData.otp !== otp) {
      storedData.attempts++;
      throw new Error("Invalid OTP");
    }
    
    // OTP verified - keep it for password reset
    return {
      success: true,
      message: "OTP verified successfully",
      email
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Reset password with OTP verification
exports.resetPasswordWithOTP = async (email, otp, newPassword) => {
  try {
    const Teacher = require("../models/teacher_model.js");
    
    // Verify OTP first
    const storedData = otpStore[email];
    
    if (!storedData) {
      throw new Error("No OTP found for this email. Please request a new OTP");
    }
    
    if (storedData.otp !== otp) {
      throw new Error("Invalid OTP");
    }
    
    if (Date.now() > storedData.expiresAt) {
      delete otpStore[email];
      throw new Error("OTP has expired");
    }
    
    // Find teacher and update password
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    teacher.password = hashedPassword;
    await teacher.save();
    
    // Clear OTP after successful reset
    delete otpStore[email];
    
    // Return success without password
    const teacherData = teacher.toObject();
    delete teacherData.password;
    
    return {
      message: "Password reset successfully",
      teacher: teacherData
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Resend OTP
exports.resendOTP = async (email) => {
  try {
    // Check if teacher exists
    const Teacher = require("../models/teacher_model.js");
    const teacher = await Teacher.findOne({ email });
    
    if (!teacher) {
      throw new Error("No account found with this email");
    }
    
    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    // Update stored OTP
    otpStore[email] = {
      otp,
      expiresAt,
      attempts: 0
    };
    
    console.log(`New OTP for ${email}: ${otp}`); // For development
    
    return {
      message: "OTP resent successfully",
      email,
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
