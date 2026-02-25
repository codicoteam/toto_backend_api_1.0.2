const end_lesson_question = require("../models/end_lesson_question.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    return await end_lesson_question.find();
  } catch (error) {
    throw new Error("Failed to fetch questions: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await end_lesson_question.findById(id);
    if (!item) throw new Error("Question not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch question: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new end_lesson_question(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create question: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await end_lesson_question.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Question not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update question: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await end_lesson_question.findByIdAndDelete(id);
    if (!item) throw new Error("Question not found");
    return { message: "Question deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete question: " + error.message);
  }
};
