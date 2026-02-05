const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller.js");
const { authenticateToken } = require("../middlewares/auth");

// Login endpoint (NO authentication required)
router.post("/login", async (req, res) => {
  try {
    // Your login logic here - check if adminController.login exists
    if (adminController.login) {
      await adminController.login(req, res);
    } else {
      // Fallback if no login method in controller
      res.status(501).json({ 
        success: false, 
        message: "Login endpoint not implemented in controller" 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Login failed", 
      error: error.message 
    });
  }
});

// CRUD endpoints (require authentication)
router.get("/", authenticateToken, adminController.getAll);
router.post("/", authenticateToken, adminController.createAdmin || adminController.create);
router.get("/:id", authenticateToken, adminController.getById);
router.put("/:id", authenticateToken, adminController.updateAdmin || adminController.update);
router.delete("/:id", authenticateToken, adminController.deleteAdmin || adminController.delete);

router.get('/', authenticateToken, adminController.getAll);
router.post('/', authenticateToken, adminController.create);
module.exports = router;
