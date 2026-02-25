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
 * /api/wallet/create:
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
 *                 example: "691884c9aa794e741c924e74"
 *               currency:
 *                 type: string
 *                 example: "USD"
 *     responses:
 *       201:
 *         description: Wallet created
 */
router.post("/create", authenticateToken, walletController.createWallet);

/**
 * @swagger
 * /api/wallet/all:
 *   get:
 *     tags: [Wallet]
 *     summary: Get all wallets
 *     responses:
 *       200:
 *         description: List of wallets
 */
router.get("/all", walletController.getAllWallets);

/**
 * @swagger
 * /api/wallet/student/{studentId}:
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
 * /api/wallet/update/{id}:
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
router.put("/update/:id", authenticateToken, walletController.updateWallet);

/**
 * @swagger
 * /api/wallet/delete/{id}:
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
router.delete("/delete/:id", authenticateToken, walletController.deleteWallet);

/**
 * @swagger
 * /api/wallet/withdraw/{studentId}:
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
 *                 example: 3
 *               method:
 *                 type: string
 *                 example: "ecocash"
 *               reference:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Withdrawal successful
 */
router.post("/withdraw/:studentId", authenticateToken, walletController.withdraw);

/**
 * @swagger
 * /api/wallet/deposit/{studentId}:
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
 *                 example: "bank_transfer"
 *               reference:
 *                 type: string
 *                 example: "REF123456"
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Deposit successful
 */
router.post("/deposit/:studentId", authenticateToken, walletController.deposit);

/**
 * @swagger
 * /api/wallet/dashboard:
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

module.exports = router;
