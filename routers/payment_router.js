const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment_controller");

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment management endpoints
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
 * /api/v1/payment:
 *   get:
 *     tags:
 *       - Payment
 *     summary: Get all Payment records
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
router.get("/", authenticateToken, paymentController.getAll || paymentController.getAllPayments);

/**
 * @swagger
 * /api/v1/payment/{id}:
 *   get:
 *     tags:
 *       - Payment
 *     summary: Get Payment by ID
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
router.get("/:id", authenticateToken, paymentController.getById || paymentController.getPaymentById);

/**
 * @swagger
 * /api/v1/payment:
 *   post:
 *     tags:
 *       - Payment
 *     summary: Create new Payment
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
router.post("/", authenticateToken, paymentController.create || paymentController.createPayment);

/**
 * @swagger
 * /api/v1/payment/{id}:
 *   put:
 *     tags:
 *       - Payment
 *     summary: Update Payment
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
router.put("/:id", authenticateToken, paymentController.update || paymentController.updatePayment);

/**
 * @swagger
 * /api/v1/payment/{id}:
 *   delete:
 *     tags:
 *       - Payment
 *     summary: Delete Payment
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
router.delete("/:id", authenticateToken, paymentController.delete || paymentController.deletePayment);

module.exports = router;
