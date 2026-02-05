const dashboardModel = require('../models/dashboard_model.js');
// dashboard Service

exports.getAll = async (filters = {}) => {
  return await dashboardModel.find(filters);
};

exports.getById = async (id) => {
  return await dashboardModel.findById(id);
};

exports.create = async (data) => {
  return await dashboardModel.create(data);
};

exports.update = async (id, data) => {
  return await dashboardModel.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await dashboardModel.findByIdAndDelete(id);
};
