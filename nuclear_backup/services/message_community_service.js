const message_communityModel = require("../models/message_community_model.js");
// messageCommunity_services Service
exports.getAll = async () => {
  console.log("getAll messageCommunity_services called");
  return [];
};

exports.getById = async (id) => {
  console.log("getById messageCommunity_services called for:", id);
  return { id };
};

exports.create = async (data) => {
  console.log("create messageCommunity_services called with:", data);
  return { id: Date.now(), ...data };
};

exports.update = async (id, data) => {
  console.log("update messageCommunity_services called for:", id, "with:", data);
  return { id, ...data };
};

exports.delete = async (id) => {
  console.log("delete messageCommunity_services called for:", id);
  return true;
};
