const express = require("express");
const router = express.Router();
const contentController = require("../controllers/content_system_controller.js");
const { authenticateToken } = require("../middlewares/auth");

// All endpoints require authentication
router.get("/", authenticateToken, contentController.getAll);
router.post("/", authenticateToken, contentController.create);
router.get("/:id", authenticateToken, contentController.getById);
router.put("/:id", authenticateToken, contentController.update);
router.delete("/:id", authenticateToken, contentController.delete);

router.get('/', authenticateToken, contentController.getAll);
router.post('/', authenticateToken, contentController.create);
module.exports = router;
