const topic_in_subjectModel = require("../models/topic_in_subject.js");
// topicInSubject_service Service
exports.getAll = async () => {
  console.log("getAll topicInSubject_service called");
  return [];
};

exports.getById = async (id) => {
  console.log("getById topicInSubject_service called for:", id);
  return { id };
};

exports.create = async (data) => {
  console.log("create topicInSubject_service called with:", data);
  return { id: Date.now(), ...data };
};

exports.update = async (id, data) => {
  console.log("update topicInSubject_service called for:", id, "with:", data);
  return { id, ...data };
};

exports.delete = async (id) => {
  console.log("delete topicInSubject_service called for:", id);
  return true;
};
