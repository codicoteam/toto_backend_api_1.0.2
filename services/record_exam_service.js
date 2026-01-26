// record_exam Service
const record_exam = require("../models/record_exam.js");

exports.getAll = async (filters = {}) => {
  return await record_exam.find(filters);
};

exports.getById = async (id) => {
  return await record_exam.findById(id);
};

exports.create = async (data) => {
  return await record_exam.create(data);
};

exports.update = async (id, data) => {
  return await record_exam.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await record_exam.findByIdAndDelete(id);
};
