// teacher Service
const teacherModel = require('../models/teacher_model.js');

exports.getAll = async (filters = {}) => {
  return await teacherModel.find(filters);
};

exports.getById = async (id) => {
  return await teacherModel.findById(id);
};

exports.create = async (data) => {
  return await teacherModel.create(data);
};

exports.update = async (id, data) => {
  return await teacherModel.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await teacherModel.findByIdAndDelete(id);
};
