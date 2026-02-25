const Chat = require("../models/chat_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Chat.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch chat: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Chat.findById(id);
    if (!item) throw new Error("Chat not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch chat: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Chat(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create chat: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Chat.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Chat not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update chat: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Chat.findByIdAndDelete(id);
    if (!item) throw new Error("Chat not found");
    return { message: "Chat deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete chat: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllChats = exports.getAll;
exports.getChatById = exports.getById;
exports.createChat = exports.create;
exports.updateChat = exports.update;
exports.deleteChat = exports.delete;
