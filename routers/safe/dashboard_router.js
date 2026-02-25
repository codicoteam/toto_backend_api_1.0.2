const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (dashboardController.loginDashboard) router.post("/login", dashboardController.loginDashboard);
if (dashboardController.registerDashboard) router.post("/register", dashboardController.registerDashboard);

// Protected endpoints (if they exist)
if (dashboardController.getAllDashboards) router.get("/", authenticateToken, dashboardController.getAllDashboards);
if (dashboardController.getDashboardById) router.get("/:id", authenticateToken, dashboardController.getDashboardById);
if (dashboardController.createDashboard) router.post("/", authenticateToken, dashboardController.createDashboard);
if (dashboardController.updateDashboard) router.put("/:id", authenticateToken, dashboardController.updateDashboard);
if (dashboardController.deleteDashboard) router.delete("/:id", authenticateToken, dashboardController.deleteDashboard);

// Fallback for standard methods
if (!dashboardController.getAllDashboards && dashboardController.getAll) router.get("/", authenticateToken, dashboardController.getAll);
if (!dashboardController.getDashboardById && dashboardController.getById) router.get("/:id", authenticateToken, dashboardController.getById);
if (!dashboardController.createDashboard && dashboardController.create) router.post("/", authenticateToken, dashboardController.create);
if (!dashboardController.updateDashboard && dashboardController.update) router.put("/:id", authenticateToken, dashboardController.update);
if (!dashboardController.deleteDashboard && dashboardController.delete) router.delete("/:id", authenticateToken, dashboardController.delete);

module.exports = router;
