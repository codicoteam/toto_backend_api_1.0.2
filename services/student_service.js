const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/student_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Student.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch student: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Student.findById(id);
    if (!item) throw new Error("Student not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch student: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Student(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create student: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Student.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Student not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update student: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Student.findByIdAndDelete(id);
    if (!item) throw new Error("Student not found");
    return { message: "Student deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete student: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllStudents = exports.getAll;
exports.getStudentById = exports.getById;
exports.createStudent = exports.create;
exports.updateStudent = exports.update;
exports.deleteStudent = exports.delete;


// Login function for student authentication
exports.login = async ({ email, password }) => {
  try {
    const Student = require("../models/student_model.js");
    const bcrypt = require("bcryptjs");
    const jwt = require("jsonwebtoken");
    
    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      throw new Error("Invalid email or password");
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, student.password);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: student._id, 
        email: student.email,
        firstName: student.firstName,
        lastName: student.lastName,
        role: "student" 
      },
      process.env.JWT_SECRET || "your-secret-key-change-this",
      { expiresIn: "7d" }
    );
    
    // Return student data without password
    const studentData = student.toObject();
    delete studentData.password;
    
    return {
      token,
      student: studentData
    };
  } catch (error) {
    throw new Error(error.message);
  }
};


// Reset password function
exports.resetPassword = async (email, newPassword) => {
  try {
    const Student = require("../models/student_model.js");
    const bcrypt = require("bcryptjs");
    
    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      throw new Error("Student not found");
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    student.password = hashedPassword;
    await student.save();
    
    // Return success without password
    const studentData = student.toObject();
    delete studentData.password;
    
    return {
      message: "Password reset successfully",
      student: studentData
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
