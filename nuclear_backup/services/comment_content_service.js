const comment_contentModel = require("../models/comment_content_model.js");
// commentContent_service Service
exports.getAll = async () => {
  console.log("getAll commentContent_service called");
  return [];
};

exports.getById = async (id) => {
  console.log("getById commentContent_service called for:", id);
  return { id };
};

exports.create = async (data) => {
  console.log("create commentContent_service called with:", data);
  return { id: Date.now(), ...data };
};

exports.update = async (id, data) => {
  console.log("update commentContent_service called for:", id, "with:", data);
  return { id, ...data };
};

exports.delete = async (id) => {
  console.log("delete commentContent_service called for:", id);
  return true;
};
