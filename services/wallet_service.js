const Wallet = require("../models/wallet_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Wallet.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch wallet: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Wallet.findById(id);
    if (!item) throw new Error("Wallet not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch wallet: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Wallet(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create wallet: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Wallet.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Wallet not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update wallet: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Wallet.findByIdAndDelete(id);
    if (!item) throw new Error("Wallet not found");
    return { message: "Wallet deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete wallet: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllWallets = exports.getAll;
exports.getWalletById = exports.getById;
exports.createWallet = exports.create;
exports.updateWallet = exports.update;
exports.deleteWallet = exports.delete;
