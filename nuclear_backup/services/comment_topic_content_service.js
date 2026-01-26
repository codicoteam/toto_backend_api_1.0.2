const comment_topic_contentModel = require("../models/comment_topic_content.js");
// commentTopicContent_service Service
exports.getAll = async () => {
  console.log("getAll commentTopicContent_service called");
  return [];
};

exports.getById = async (id) => {
  console.log("getById commentTopicContent_service called for:", id);
  return { id };
};

exports.create = async (data) => {
  console.log("create commentTopicContent_service called with:", data);
  return { id: Date.now(), ...data };
};

exports.update = async (id, data) => {
  console.log("update commentTopicContent_service called for:", id, "with:", data);
  return { id, ...data };
};

exports.delete = async (id) => {
  console.log("delete commentTopicContent_service called for:", id);
  return true;
};
