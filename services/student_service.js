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
