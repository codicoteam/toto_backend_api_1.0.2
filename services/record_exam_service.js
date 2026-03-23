const RecordExam = require("../models/record_exam_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await RecordExam.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch record_exam: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await RecordExam.findById(id);
    if (!item) throw new Error("RecordExam not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch record_exam: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new RecordExam(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create record_exam: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await RecordExam.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("RecordExam not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update record_exam: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await RecordExam.findByIdAndDelete(id);
    if (!item) throw new Error("RecordExam not found");
    return { message: "RecordExam deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete record_exam: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllRecordExams = exports.getAll;
exports.getRecordExamById = exports.getById;
exports.createRecordExam = exports.create;
exports.updateRecordExam = exports.update;
exports.deleteRecordExam = exports.delete;

// Get records by student ID
exports.getByStudentId = async (studentId) => {
  try {
    const items = await RecordExam.find({ studentId })
      .populate('examId')
      .sort({ createdAt: -1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch records by student: " + error.message);
  }
};

// Get records by exam ID
exports.getByExamId = async (examId) => {
  try {
    const items = await RecordExam.find({ examId })
      .populate('studentId')
      .sort({ score: -1 });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch records by exam: " + error.message);
  }
};

// Get top students for an exam
exports.getTopStudents = async (examId, limit = 10) => {
  try {
    const items = await RecordExam.find({ examId })
      .populate('studentId', 'firstName lastName email')
      .sort({ score: -1 })
      .limit(limit);
    return items;
  } catch (error) {
    throw new Error("Failed to fetch top students: " + error.message);
  }
};

// Get student's performance summary
exports.getStudentPerformance = async (studentId) => {
  try {
    const records = await RecordExam.find({ studentId })
      .populate('examId')
      .sort({ createdAt: -1 });
    
    // Calculate statistics
    const totalExams = records.length;
    const averageScore = records.reduce((acc, curr) => acc + (curr.score || 0), 0) / totalExams || 0;
    const highestScore = Math.max(...records.map(r => r.score || 0));
    const lowestScore = Math.min(...records.map(r => r.score || 0));
    
    return {
      totalExams,
      averageScore,
      highestScore,
      lowestScore,
      recentExams: records.slice(0, 5)
    };
  } catch (error) {
    throw new Error("Failed to fetch student performance: " + error.message);
  }
};

// Update service to use correct model name
