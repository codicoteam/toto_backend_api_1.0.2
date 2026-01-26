const router = express.Router();
const express = require("express");
const paymentController = require("../controllers/payment_controller");
const { authenticateToken } = require("../middlewares/auth");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/payment:
 *   get:
 *     summary: Get all payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payment
 */

router.get("/", authenticateToken, paymentController.getAll);

router.get("/", authenticateToken, paymentController.getAll);
router.get("/:id", authenticateToken, paymentController.getById);
router.post("/", authenticateToken, paymentController.create);
router.put("/:id", authenticateToken, paymentController.update);
router.delete("/:id", authenticateToken, paymentController.delete);

module.exports = router;