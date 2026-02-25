const ContentSystem = require("../models/content_system.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    return await ContentSystem.find();
  } catch (error) {
    throw new Error("Failed to fetch content: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await ContentSystem.findById(id);
    if (!item) throw new Error("Content not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch content: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new ContentSystem(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create content: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await ContentSystem.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Content not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update content: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await ContentSystem.findByIdAndDelete(id);
    if (!item) throw new Error("Content not found");
    return { message: "Content deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete content: " + error.message);
  }
};
