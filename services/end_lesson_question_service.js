const EndLessonQuestion = require("../models/end_lesson_question_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    return await EndLessonQuestion.find();
  } catch (error) {
    throw new Error("Failed to fetch questions: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await EndLessonQuestion.findById(id);
    if (!item) throw new Error("Question not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch question: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new EndLessonQuestion(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create question: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await EndLessonQuestion.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Question not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update question: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await EndLessonQuestion.findByIdAndDelete(id);
    if (!item) throw new Error("Question not found");
    return { message: "Question deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete question: " + error.message);
  }
};

// Get questions by topic content ID
exports.getByTopicContentId = async (topicContentId) => {
  try {
    const items = await EndLessonQuestion.find({ 
      topicContentId: topicContentId,
      status: 'active' 
    });
    return items;
  } catch (error) {
    throw new Error("Failed to fetch questions by topic: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllQuestions = exports.getAll;
exports.getQuestionById = exports.getById;
exports.createQuestion = exports.create;
exports.updateQuestion = exports.update;
exports.deleteQuestion = exports.delete;
