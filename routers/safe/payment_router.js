const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (paymentController.loginPayment) router.post("/login", paymentController.loginPayment);
if (paymentController.registerPayment) router.post("/register", paymentController.registerPayment);

// Protected endpoints (if they exist)
if (paymentController.getAllPayments) router.get("/", authenticateToken, paymentController.getAllPayments);
if (paymentController.getPaymentById) router.get("/:id", authenticateToken, paymentController.getPaymentById);
if (paymentController.createPayment) router.post("/", authenticateToken, paymentController.createPayment);
if (paymentController.updatePayment) router.put("/:id", authenticateToken, paymentController.updatePayment);
if (paymentController.deletePayment) router.delete("/:id", authenticateToken, paymentController.deletePayment);

// Fallback for standard methods
if (!paymentController.getAllPayments && paymentController.getAll) router.get("/", authenticateToken, paymentController.getAll);
if (!paymentController.getPaymentById && paymentController.getById) router.get("/:id", authenticateToken, paymentController.getById);
if (!paymentController.createPayment && paymentController.create) router.post("/", authenticateToken, paymentController.create);
if (!paymentController.updatePayment && paymentController.update) router.put("/:id", authenticateToken, paymentController.update);
if (!paymentController.deletePayment && paymentController.delete) router.delete("/:id", authenticateToken, paymentController.delete);

module.exports = router;
