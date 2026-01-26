const adminModel = require("../models/admin_model.js");
// Admin Service
exports.getAll = async () => {
  console.log("getAll admins service called");
  return [
    { id: 1, name: "Admin 1", email: "admin1@example.com" },
    { id: 2, name: "Admin 2", email: "admin2@example.com" }
  ];
};

exports.getById = async (id) => {
  console.log("getById admin service called for:", id);
  return { id, name: "Admin", email: "admin@example.com" };
};

exports.create = async (data) => {
  console.log("create admin service called with:", data);
  return { id: Date.now(), ...data, createdAt: new Date() };
};

exports.update = async (id, data) => {
  console.log("update admin service called for:", id, "with:", data);
  return { id, ...data, updatedAt: new Date() };
};

exports.delete = async (id) => {
  console.log("delete admin service called for:", id);
  return { deleted: true, id };
};

// Original functions
exports.createAdmin = exports.create;
exports.loginAdmin = async (credentials) => {
  console.log("loginAdmin service called with:", credentials);
  return { token: "sample-jwt-token", user: { id: 1, email: credentials.email } };
};

exports.getAdminById = exports.getById;
exports.getAllAdmins = exports.getAll;
exports.updateAdmin = exports.update;
exports.deleteAdmin = exports.delete;

exports.forgotPassword = async (email) => {
  console.log("forgotPassword service called for:", email);
  return { success: true, message: "Reset OTP sent" };
};

exports.verifyResetOTP = async (email, otp) => {
  console.log("verifyResetOTP service called for:", email, otp);
  return { success: true, token: "reset-token" };
};

exports.resetPassword = async (token, newPassword) => {
  console.log("resetPassword service called with token and new password");
  return { success: true, message: "Password reset successful" };
};
