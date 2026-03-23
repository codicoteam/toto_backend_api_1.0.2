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
 * /api/v1/payment:
 *   get:
 *     tags: [Payment]
 *     summary: Get all payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payments
 */
router.get("/", authenticateToken, paymentController.getAllPayments);

/**
 * @swagger
 * /api/v1/payment/mobile:
 *   post:
 *     tags: [Payment]
 *     summary: Create mobile payment (Ecocash/Paynow)
 *     security:
 *       - bearerAuth: []
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
 *                 example: "60d21b4667d0d8992e610c85"
 *                 description: Student ID
 *               amount:
 *                 type: number
 *                 example: 50.00
 *                 description: Payment amount
 *               customerPhoneNumber:
 *                 type: string
 *                 example: "0771234567"
 *                 description: Customer phone number for mobile money
 *               description:
 *                 type: string
 *                 example: "Monthly subscription fee"
 *                 description: Payment description
 *     responses:
 *       201:
 *         description: Payment initiated
 */
router.post("/mobile", authenticateToken, paymentController.createMobilePayment);

/**
 * @swagger
 * /api/v1/payment/{id}:
 *   get:
 *     tags: [Payment]
 *     summary: Get payment by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment details
 */
router.get("/:id", authenticateToken, paymentController.getPaymentById);

/**
 * @swagger
 * /api/v1/payment/status/check:
 *   post:
 *     tags: [Payment]
 *     summary: Check payment status
 *     security:
 *       - bearerAuth: []
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
 *                 example: "https://api.example.com/payments/status/123"
 *                 description: Poll URL from payment initiation
 *     responses:
 *       200:
 *         description: Payment status
 */
router.post("/status/check", authenticateToken, paymentController.checkPaymentStatus);

/**
 * @swagger
 * /api/v1/payment/status/{status}:
 *   get:
 *     tags: [Payment]
 *     summary: Get payments by status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pending, completed, failed, refunded]
 *         description: Payment status
 *     responses:
 *       200:
 *         description: Payments with specified status
 */
router.get("/status/:status", authenticateToken, paymentController.getPaymentsByStatus);

/**
 * @swagger
 * /api/v1/payment/student/{studentId}:
 *   get:
 *     tags: [Payment]
 *     summary: Get payments by student ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student's payments
 */
router.get("/student/:studentId", authenticateToken, paymentController.getPaymentsByStudentId);

/**
 * @swagger
 * /api/v1/payment/{id}:
 *   delete:
 *     tags: [Payment]
 *     summary: Delete payment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment deleted
 */
router.delete("/:id", authenticateToken, paymentController.deletePayment);

module.exports = router;
