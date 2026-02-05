const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet_controller");

/**
 * @swagger
 * tags:
 *   name: Wallet
 *   description: Wallet management endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const { authenticateToken } = require("../middlewares/auth");

// Basic routes (customize based on actual controller functions)

/**
 * @swagger
 * /api/v1/wallet:
 *   get:
 *     tags:
 *       - Wallet
 *     summary: Get all Wallet records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/", authenticateToken, walletController.getAll || walletController.getAllWallets);

/**
 * @swagger
 * /api/v1/wallet/{id}:
 *   get:
 *     tags:
 *       - Wallet
 *     summary: Get Wallet by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.get("/:id", authenticateToken, walletController.getById || walletController.getWalletById);

/**
 * @swagger
 * /api/v1/wallet:
 *   post:
 *     tags:
 *       - Wallet
 *     summary: Create new Wallet
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/", authenticateToken, walletController.create || walletController.createWallet);

/**
 * @swagger
 * /api/v1/wallet/{id}:
 *   put:
 *     tags:
 *       - Wallet
 *     summary: Update Wallet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.put("/:id", authenticateToken, walletController.update || walletController.updateWallet);

/**
 * @swagger
 * /api/v1/wallet/{id}:
 *   delete:
 *     tags:
 *       - Wallet
 *     summary: Delete Wallet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.delete("/:id", authenticateToken, walletController.delete || walletController.deleteWallet);

router.get('/', authenticateToken, walletController.getAll);
router.post('/', authenticateToken, walletController.create);
module.exports = router;
