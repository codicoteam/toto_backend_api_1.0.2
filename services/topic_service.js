// topic Service
const topic = require('../models/topic_model.js');

exports.getAll = async (filters = {}) => {
  return await topic.find(filters);
};

exports.getById = async (id) => {
  return await topic.findById(id);
};

exports.create = async (data) => {
  return await topic.create(data);
};

exports.update = async (id, data) => {
  return await topic.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await topic.findByIdAndDelete(id);
};
