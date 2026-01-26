const chatModel = require("../models/chat_model.js");
// Chat Service
exports.getAll = async () => {
  console.log("getAll chats service called");
  return [
    { id: 1, sender: "teacher1", receiver: "student1", message: "Hello" },
    { id: 2, sender: "student1", receiver: "teacher1", message: "Hi there" }
  ];
};

exports.getById = async (id) => {
  console.log("getById chat service called for:", id);
  return { id, sender: "teacher1", receiver: "student1", message: "Sample chat" };
};

exports.create = async (data) => {
  console.log("create chat service called with:", data);
  return { id: Date.now(), ...data, createdAt: new Date() };
};

exports.update = async (id, data) => {
  console.log("update chat service called for:", id, "with:", data);
  return { id, ...data, updatedAt: new Date() };
};

exports.delete = async (id) => {
  console.log("delete chat service called for:", id);
  return { deleted: true, id };
};
