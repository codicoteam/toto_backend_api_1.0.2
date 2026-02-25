const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment management
 */

/**
 * @swagger
 * /api/v1/payment/mobile-ecocash-paynow-me:
 *   post:
 *     tags: [Payment]
 *     summary: Create mobile payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - amount
 *               - customerPhoneNumber
 *             properties:
 *               student_id:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               customerPhoneNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment initiated
 */
router.post("/mobile-ecocash-paynow-me", paymentController.createMobilePayment);

/**
 * @swagger
 * /api/v1/payment/getAllPayments:
 *   get:
 *     tags: [Payment]
 *     summary: Get all payments
 *     responses:
 *       200:
 *         description: List of payments
 */
router.get("/getAllPayments", paymentController.getAllPayments);

/**
 * @swagger
 * /api/v1/payment/payments/{id}:
 *   get:
 *     tags: [Payment]
 *     summary: Get payment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
 */
router.get("/payments/:id", paymentController.getPaymentById);

/**
 * @swagger
 * /api/v1/payment/check-status:
 *   post:
 *     tags: [Payment]
 *     summary: Check payment status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pollUrl
 *             properties:
 *               pollUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment status
 */
router.post("/check-status", paymentController.checkPaymentStatus);

/**
 * @swagger
 * /api/v1/payment/status/{status}:
 *   get:
 *     tags: [Payment]
 *     summary: Get payments by status
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payments with status
 */
router.get("/status/:status", paymentController.getPaymentsByStatus);

/**
 * @swagger
 * /api/v1/payment/delete/{id}:
 *   delete:
 *     tags: [Payment]
 *     summary: Delete payment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment deleted
 */
router.delete("/delete/:id", paymentController.deletePayment);

module.exports = router;
