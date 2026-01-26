// Topic Service
const topicModel = require("../models/topic.js");

exports.getAll = async (filters = {}) => {
  return await topicModel.find(filters);
};

exports.getById = async (id) => {
  return await topicModel.findById(id);
};

exports.create = async (data) => {
  return await topicModel.create(data);
};

exports.update = async (id, data) => {
  return await topicModel.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await topicModel.findByIdAndDelete(id);
};
