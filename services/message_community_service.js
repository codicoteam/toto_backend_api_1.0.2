// message_community Service
const message_communityModel = require("../models/message_community_model.js");

exports.getAll = async (filters = {}) => {
  return await message_communityModel.find(filters);
};

exports.getById = async (id) => {
  return await message_communityModel.findById(id);
};

exports.create = async (data) => {
  return await message_communityModel.create(data);
};

exports.update = async (id, data) => {
  return await message_communityModel.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await message_communityModel.findByIdAndDelete(id);
};
