// teacher_student_chat Service
const teacher_student_chatModel = require('../models/teacher_student_chat_model.js');

exports.getAll = async (filters = {}) => {
  return await teacher_student_chatModel.find(filters);
};

exports.getById = async (id) => {
  return await teacher_student_chatModel.findById(id);
};

exports.create = async (data) => {
  return await teacher_student_chatModel.create(data);
};

exports.update = async (id, data) => {
  return await teacher_student_chatModel.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await teacher_student_chatModel.findByIdAndDelete(id);
};
