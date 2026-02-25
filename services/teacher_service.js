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
