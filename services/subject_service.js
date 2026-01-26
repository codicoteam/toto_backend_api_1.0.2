const subjectModel = require("../models/subjects_model.js");
// subject Service

exports.getAll = async (filters = {}) => {
  return await subject.find(filters);
};

exports.getById = async (id) => {
  return await subject.findById(id);
};

exports.create = async (data) => {
  return await subject.create(data);
};

exports.update = async (id, data) => {
  return await subject.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await subject.findByIdAndDelete(id);
};
