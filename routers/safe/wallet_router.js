const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (walletController.loginWallet) router.post("/login", walletController.loginWallet);
if (walletController.registerWallet) router.post("/register", walletController.registerWallet);

// Protected endpoints (if they exist)
if (walletController.getAllWallets) router.get("/", authenticateToken, walletController.getAllWallets);
if (walletController.getWalletById) router.get("/:id", authenticateToken, walletController.getWalletById);
if (walletController.createWallet) router.post("/", authenticateToken, walletController.createWallet);
if (walletController.updateWallet) router.put("/:id", authenticateToken, walletController.updateWallet);
if (walletController.deleteWallet) router.delete("/:id", authenticateToken, walletController.deleteWallet);

// Fallback for standard methods
if (!walletController.getAllWallets && walletController.getAll) router.get("/", authenticateToken, walletController.getAll);
if (!walletController.getWalletById && walletController.getById) router.get("/:id", authenticateToken, walletController.getById);
if (!walletController.createWallet && walletController.create) router.post("/", authenticateToken, walletController.create);
if (!walletController.updateWallet && walletController.update) router.put("/:id", authenticateToken, walletController.update);
if (!walletController.deleteWallet && walletController.delete) router.delete("/:id", authenticateToken, walletController.delete);

module.exports = router;
