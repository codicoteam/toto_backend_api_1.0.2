const Community = require("../models/community_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Community.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch community: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Community.findById(id);
    if (!item) throw new Error("Community not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch community: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Community(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create community: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Community.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Community not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update community: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Community.findByIdAndDelete(id);
    if (!item) throw new Error("Community not found");
    return { message: "Community deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete community: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllCommunitys = exports.getAll;
exports.getCommunityById = exports.getById;
exports.createCommunity = exports.create;
exports.updateCommunity = exports.update;
exports.deleteCommunity = exports.delete;
