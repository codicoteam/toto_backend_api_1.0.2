// chat Service
const chatModel = require("../models/chat_model.js");

exports.getAll = async (filters = {}) => {
  return await chatModel.find(filters);
};

exports.getById = async (id) => {
  return await chatModel.findById(id);
};

exports.create = async (data) => {
  return await chatModel.create(data);
};

exports.update = async (id, data) => {
  return await chatModel.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await chatModel.findByIdAndDelete(id);
};
