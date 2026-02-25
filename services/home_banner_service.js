const Home_banner = require("../models/home_banner_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Home_banner.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch home_banner: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Home_banner.findById(id);
    if (!item) throw new Error("Home_banner not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch home_banner: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Home_banner(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create home_banner: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Home_banner.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Home_banner not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update home_banner: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Home_banner.findByIdAndDelete(id);
    if (!item) throw new Error("Home_banner not found");
    return { message: "Home_banner deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete home_banner: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllHome_banners = exports.getAll;
exports.getHome_bannerById = exports.getById;
exports.createHome_banner = exports.create;
exports.updateHome_banner = exports.update;
exports.deleteHome_banner = exports.delete;
