const Dashboard = require("../models/dashboard_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Dashboard.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch dashboard: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Dashboard.findById(id);
    if (!item) throw new Error("Dashboard not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch dashboard: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Dashboard(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create dashboard: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Dashboard.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Dashboard not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update dashboard: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Dashboard.findByIdAndDelete(id);
    if (!item) throw new Error("Dashboard not found");
    return { message: "Dashboard deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete dashboard: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllDashboards = exports.getAll;
exports.getDashboardById = exports.getById;
exports.createDashboard = exports.create;
exports.updateDashboard = exports.update;
exports.deleteDashboard = exports.delete;

// Get student level information
exports.getStudentLevelInfo = async (level, studentId) => {
  try {
    // Import models
    const Student = require("../models/student_model.js");
    const Topic = require("../models/topic_model.js");
    const Exam = require("../models/exam_model.js");
    
    let result = {};
    
    // Get student count by level if level provided
    if (level) {
      result.studentCount = await Student.countDocuments({ level: level });
    }
    
    // Get student specific info if studentId provided
    if (studentId) {
      const student = await Student.findById(studentId);
      if (student) {
        result.student = {
          id: student._id,
          name: `${student.firstName} ${student.lastName}`,
          level: student.level,
          subjects: student.subjects,
          subscription_status: student.subscription_status
        };
        
        // Get recent exams for this student
        const RecordExam = require("../models/record_exam_model.js");
        result.recentExams = await RecordExam.find({ studentId: studentId })
          .sort({ createdAt: -1 })
          .limit(5);
      }
    }
    
    return result;
  } catch (error) {
    throw new Error("Failed to get student level info: " + error.message);
  }
};

// Get main dashboard data
exports.getDashboard = async (user) => {
  try {
    const Student = require("../models/student_model.js");
    const Teacher = require("../models/teacher_model.js");
    const Exam = require("../models/exam_model.js");
    const Topic = require("../models/topic_model.js");
    
    let result = {};
    
    // Get counts based on user role
    if (user.role === 'admin') {
      result.totalStudents = await Student.countDocuments();
      result.totalTeachers = await Teacher.countDocuments();
      result.totalExams = await Exam.countDocuments();
      result.totalTopics = await Topic.countDocuments();
      
      // Recent activity
      result.recentStudents = await Student.find().sort({ createdAt: -1 }).limit(5);
    } else if (user.role === 'teacher') {
      // Teacher specific dashboard
      result.myStudents = await Student.countDocuments({ /* teacher specific query */ });
      result.upcomingExams = await Exam.countDocuments({ /* teacher specific query */ });
    } else if (user.role === 'student') {
      // Student specific dashboard
      result.myProgress = await Topic.countDocuments({ /* student specific query */ });
      result.upcomingExams = await Exam.countDocuments({ /* student specific query */ });
    }
    
    return result;
  } catch (error) {
    throw new Error("Failed to get dashboard data: " + error.message);
  }
};
