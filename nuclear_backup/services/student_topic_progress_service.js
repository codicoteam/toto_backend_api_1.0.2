const student_topic_progressModel = require("../models/student_topic_progress.js");
// studentTopicProgress_service Service
exports.getAll = async () => {
  console.log("getAll studentTopicProgress_service called");
  return [];
};

exports.getById = async (id) => {
  console.log("getById studentTopicProgress_service called for:", id);
  return { id };
};

exports.create = async (data) => {
  console.log("create studentTopicProgress_service called with:", data);
  return { id: Date.now(), ...data };
};

exports.update = async (id, data) => {
  console.log("update studentTopicProgress_service called for:", id, "with:", data);
  return { id, ...data };
};

exports.delete = async (id) => {
  console.log("delete studentTopicProgress_service called for:", id);
  return true;
};
