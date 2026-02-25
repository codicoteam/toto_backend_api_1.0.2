const Message_community = require("../models/message_community_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Message_community.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch message_community: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Message_community.findById(id);
    if (!item) throw new Error("Message_community not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch message_community: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Message_community(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create message_community: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Message_community.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Message_community not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update message_community: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Message_community.findByIdAndDelete(id);
    if (!item) throw new Error("Message_community not found");
    return { message: "Message_community deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete message_community: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllMessage_communitys = exports.getAll;
exports.getMessage_communityById = exports.getById;
exports.createMessage_community = exports.create;
exports.updateMessage_community = exports.update;
exports.deleteMessage_community = exports.delete;
