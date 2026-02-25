const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (adminController.loginAdmin) router.post("/login", adminController.loginAdmin);
if (adminController.registerAdmin) router.post("/register", adminController.registerAdmin);

// Protected endpoints (if they exist)
if (adminController.getAllAdmins) router.get("/", authenticateToken, adminController.getAllAdmins);
if (adminController.getAdminById) router.get("/:id", authenticateToken, adminController.getAdminById);
if (adminController.createAdmin) router.post("/", authenticateToken, adminController.createAdmin);
if (adminController.updateAdmin) router.put("/:id", authenticateToken, adminController.updateAdmin);
if (adminController.deleteAdmin) router.delete("/:id", authenticateToken, adminController.deleteAdmin);

// Fallback for standard methods
if (!adminController.getAllAdmins && adminController.getAll) router.get("/", authenticateToken, adminController.getAll);
if (!adminController.getAdminById && adminController.getById) router.get("/:id", authenticateToken, adminController.getById);
if (!adminController.createAdmin && adminController.create) router.post("/", authenticateToken, adminController.create);
if (!adminController.updateAdmin && adminController.update) router.put("/:id", authenticateToken, adminController.update);
if (!adminController.deleteAdmin && adminController.delete) router.delete("/:id", authenticateToken, adminController.delete);

module.exports = router;
