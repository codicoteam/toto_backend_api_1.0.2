const Payment = require("../models/payment_model.js");

// Basic CRUD operations
exports.getAll = async () => {
  try {
    const items = await Payment.find();
    return items;
  } catch (error) {
    throw new Error("Failed to fetch payment: " + error.message);
  }
};

exports.getById = async (id) => {
  try {
    const item = await Payment.findById(id);
    if (!item) throw new Error("Payment not found");
    return item;
  } catch (error) {
    throw new Error("Failed to fetch payment: " + error.message);
  }
};

exports.create = async (data) => {
  try {
    const item = new Payment(data);
    return await item.save();
  } catch (error) {
    throw new Error("Failed to create payment: " + error.message);
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Payment.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new Error("Payment not found");
    return item;
  } catch (error) {
    throw new Error("Failed to update payment: " + error.message);
  }
};

exports.delete = async (id) => {
  try {
    const item = await Payment.findByIdAndDelete(id);
    if (!item) throw new Error("Payment not found");
    return { message: "Payment deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete payment: " + error.message);
  }
};

// Aliases for compatibility
exports.getAllPayments = exports.getAll;
exports.getPaymentById = exports.getById;
exports.createPayment = exports.create;
exports.updatePayment = exports.update;
exports.deletePayment = exports.delete;
