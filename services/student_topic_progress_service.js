const Student_topic_progress = require("../models/student_topic_progress_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Student_topic_progress.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch student_topic_progress: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Student_topic_progress.findById(id);
    if (!item) throw new Error("Student_topic_progress not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch student_topic_progress: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Student_topic_progress(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create student_topic_progress: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Student_topic_progress.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Student_topic_progress not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update student_topic_progress: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Student_topic_progress.findByIdAndDelete(id);
    if (!item) throw new Error("Student_topic_progress not found");
    return { message: "Student_topic_progress deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete student_topic_progress: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllStudent_topic_progresss = exports.getAll;
exports.getStudent_topic_progressById = exports.getById;
exports.createStudent_topic_progress = exports.create;
exports.updateStudent_topic_progress = exports.update;
exports.deleteStudent_topic_progress = exports.delete;
