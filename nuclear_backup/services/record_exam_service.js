const record_examModel = require("../models/record_exam.js");
// recordExam_service Service
exports.getAll = async () => {
  console.log("getAll recordExam_service called");
  return [];
};

exports.getById = async (id) => {
  console.log("getById recordExam_service called for:", id);
  return { id };
};

exports.create = async (data) => {
  console.log("create recordExam_service called with:", data);
  return { id: Date.now(), ...data };
};

exports.update = async (id, data) => {
  console.log("update recordExam_service called for:", id, "with:", data);
  return { id, ...data };
};

exports.delete = async (id) => {
  console.log("delete recordExam_service called for:", id);
  return true;
};
