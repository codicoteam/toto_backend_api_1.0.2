const router = express.Router();
const express = require("express");
const walletController = require("../controllers/wallet_controller");
const { authenticateToken } = require("../middlewares/auth");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/wallet:
 *   get:
 *     summary: Get all wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wallet
 */

router.get("/", authenticateToken, walletController.getAll);

router.get("/", authenticateToken, walletController.getAll);
router.get("/:id", authenticateToken, walletController.getById);
router.post("/", authenticateToken, walletController.create);
router.put("/:id", authenticateToken, walletController.update);
router.delete("/:id", authenticateToken, walletController.delete);

module.exports = router;