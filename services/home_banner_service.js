const HomeBanner = require("../models/home_banner_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await HomeBanner.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch home_banner: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await HomeBanner.findById(id);
    if (!item) throw new Error("HomeBanner not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch home_banner: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new HomeBanner(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create home_banner: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await HomeBanner.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("HomeBanner not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update home_banner: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await HomeBanner.findByIdAndDelete(id);
    if (!item) throw new Error("HomeBanner not found");
    return { message: "HomeBanner deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete home_banner: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllHomeBanners = exports.getAll;
exports.getHomeBannerById = exports.getById;
exports.createHomeBanner = exports.create;
exports.updateHomeBanner = exports.update;
exports.deleteHomeBanner = exports.delete;
