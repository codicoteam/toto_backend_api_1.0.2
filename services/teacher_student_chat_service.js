const Teacher_student_chat = require("../models/teacher_student_chat_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Teacher_student_chat.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch teacher_student_chat: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Teacher_student_chat.findById(id);
    if (!item) throw new Error("Teacher_student_chat not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch teacher_student_chat: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Teacher_student_chat(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create teacher_student_chat: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Teacher_student_chat.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Teacher_student_chat not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update teacher_student_chat: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Teacher_student_chat.findByIdAndDelete(id);
    if (!item) throw new Error("Teacher_student_chat not found");
    return { message: "Teacher_student_chat deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete teacher_student_chat: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllTeacher_student_chats = exports.getAll;
exports.getTeacher_student_chatById = exports.getById;
exports.createTeacher_student_chat = exports.create;
exports.updateTeacher_student_chat = exports.update;
exports.deleteTeacher_student_chat = exports.delete;
