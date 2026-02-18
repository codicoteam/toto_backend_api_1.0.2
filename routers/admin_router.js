const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management endpoints
 */

// PUBLIC ENDPOINTS (no token required)
router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);

// PROTECTED ENDPOINTS (token required)
router.get("/", authenticateToken, adminController.getAllAdmins);
router.get("/:id", authenticateToken, adminController.getAdminById);
router.put("/:id", authenticateToken, adminController.updateAdmin);
router.delete("/:id", authenticateToken, adminController.deleteAdmin);
router.get("/all", authenticateToken, adminController.getAll);
router.post("/create", authenticateToken, adminController.create);

module.exports = router;
