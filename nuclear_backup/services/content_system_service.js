const content_systemModel = require("../models/content_system.js");
// contentSystem_service Service
exports.getAll = async () => {
  console.log("getAll contentSystem_service called");
  return [];
};

exports.getById = async (id) => {
  console.log("getById contentSystem_service called for:", id);
  return { id };
};

exports.create = async (data) => {
  console.log("create contentSystem_service called with:", data);
  return { id: Date.now(), ...data };
};

exports.update = async (id, data) => {
  console.log("update contentSystem_service called for:", id, "with:", data);
  return { id, ...data };
};

exports.delete = async (id) => {
  console.log("delete contentSystem_service called for:", id);
  return true;
};
