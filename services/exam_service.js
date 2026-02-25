const Exam = require("../models/exam_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Exam.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch exam: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Exam.findById(id);
    if (!item) throw new Error("Exam not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch exam: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Exam(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create exam: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Exam.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Exam not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update exam: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Exam.findByIdAndDelete(id);
    if (!item) throw new Error("Exam not found");
    return { message: "Exam deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete exam: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllExams = exports.getAll;
exports.getExamById = exports.getById;
exports.createExam = exports.create;
exports.updateExam = exports.update;
exports.deleteExam = exports.delete;
