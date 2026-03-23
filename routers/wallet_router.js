const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Wallet
 *   description: Student wallet management
 */

/**
 * @swagger
 * /api/v1/wallet:
 *   get:
 *     tags: [Wallet]
 *     summary: Get all wallets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wallets
 */
router.get("/", authenticateToken, walletController.getAllWallets);

/**
 * @swagger
 * /api/v1/wallet/dashboard:
 *   get:
 *     tags: [Wallet]
 *     summary: Get wallet dashboard data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 */
router.get("/dashboard", authenticateToken, walletController.getDashboardData);

/**
 * @swagger
 * /api/v1/wallet/summary:
 *   get:
 *     tags: [Wallet]
 *     summary: Get wallet summary (admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet summary
 */
router.get("/summary", authenticateToken, walletController.getSummary);

/**
 * @swagger
 * /api/v1/wallet/student/{studentId}:
 *   get:
 *     tags: [Wallet]
 *     summary: Get wallet by student ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wallet details
 */
router.get("/student/:studentId", authenticateToken, walletController.getWalletByStudentId);

/**
 * @swagger
 * /api/v1/wallet/student/{studentId}/transactions:
 *   get:
 *     tags: [Wallet]
 *     summary: Get transaction history
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *     responses:
 *       200:
 *         description: Transaction history
 */
router.get("/student/:studentId/transactions", authenticateToken, walletController.getTransactions);

/**
 * @swagger
 * /api/v1/wallet:
 *   post:
 *     tags: [Wallet]
 *     summary: Create wallet
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student
 *               - currency
 *             properties:
 *               student:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *               currency:
 *                 type: string
 *                 enum: [USD, ZWL, EUR, GBP]
 *                 example: "USD"
 *     responses:
 *       201:
 *         description: Wallet created
 */
router.post("/", authenticateToken, walletController.createWallet);

/**
 * @swagger
 * /api/v1/wallet/student/{studentId}/deposit:
 *   post:
 *     tags: [Wallet]
 *     summary: Deposit to wallet
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - method
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100
 *               method:
 *                 type: string
 *                 enum: [ecocash, bank_transfer, credit_card, paypal, cash]
 *                 example: "ecocash"
 *               reference:
 *                 type: string
 *                 example: "REF123456"
 *               description:
 *                 type: string
 *                 example: "Deposit from Ecocash"
 *     responses:
 *       200:
 *         description: Deposit successful
 */
router.post("/student/:studentId/deposit", authenticateToken, walletController.deposit);

/**
 * @swagger
 * /api/v1/wallet/student/{studentId}/withdraw:
 *   post:
 *     tags: [Wallet]
 *     summary: Withdraw from wallet
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - method
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 50
 *               method:
 *                 type: string
 *                 enum: [ecocash, bank_transfer, cash]
 *                 example: "ecocash"
 *               reference:
 *                 type: string
 *                 example: "WITHDRAW123"
 *               description:
 *                 type: string
 *                 example: "Withdrawal to Ecocash"
 *     responses:
 *       200:
 *         description: Withdrawal successful
 */
router.post("/student/:studentId/withdraw", authenticateToken, walletController.withdraw);

/**
 * @swagger
 * /api/v1/wallet/{id}:
 *   put:
 *     tags: [Wallet]
 *     summary: Update wallet
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Wallet updated
 */
router.put("/:id", authenticateToken, walletController.updateWallet);

/**
 * @swagger
 * /api/v1/wallet/{id}:
 *   delete:
 *     tags: [Wallet]
 *     summary: Delete wallet
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wallet deleted
 */
router.delete("/:id", authenticateToken, walletController.deleteWallet);

module.exports = router;
