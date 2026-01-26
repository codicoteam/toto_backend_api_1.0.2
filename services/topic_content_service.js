// topic_content Service
const topic_contentModel = require("../models/topic_content_model.js");

exports.getAll = async (filters = {}) => {
  return await topic_contentModel.find(filters);
};

exports.getById = async (id) => {
  return await topic_contentModel.findById(id);
};

exports.create = async (data) => {
  return await topic_contentModel.create(data);
};

exports.update = async (id, data) => {
  return await topic_contentModel.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await topic_contentModel.findByIdAndDelete(id);
};
