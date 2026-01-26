const end_lesson_questionModel = require("../models/end_lesson_question.js");
// endLessonQuestion_service Service
exports.getAll = async () => {
  console.log("getAll endLessonQuestion_service called");
  return [];
};

exports.getById = async (id) => {
  console.log("getById endLessonQuestion_service called for:", id);
  return { id };
};

exports.create = async (data) => {
  console.log("create endLessonQuestion_service called with:", data);
  return { id: Date.now(), ...data };
};

exports.update = async (id, data) => {
  console.log("update endLessonQuestion_service called for:", id, "with:", data);
  return { id, ...data };
};

exports.delete = async (id) => {
  console.log("delete endLessonQuestion_service called for:", id);
  return true;
};
