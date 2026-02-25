const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrator operations
 */

/**
 * @swagger
 * /api/v1/admin_route/signup:
 *   post:
 *     tags: [Admin]
 *     summary: Admin signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - contactNumber
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin registered successfully
 */
router.post("/signup", adminController.registerAdmin);

/**
 * @swagger
 * /api/v1/admin_route/login:
 *   post:
 *     tags: [Admin]
 *     summary: Admin login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     admin:
 *                       type: object
 */
router.post("/login", adminController.loginAdmin);

/**
 * @swagger
 * /api/v1/admin_route/forgot-password:
 *   post:
 *     tags: [Admin]
 *     summary: Forgot password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: OTP sent
 */
router.post("/forgot-password", adminController.forgotPassword);

/**
 * @swagger
 * /api/v1/admin_route/verify-reset-otp:
 *   post:
 *     tags: [Admin]
 *     summary: Verify reset OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified
 */
router.post("/verify-reset-otp", adminController.verifyResetOTP);

/**
 * @swagger
 * /api/v1/admin_route/reset-password:
 *   post:
 *     tags: [Admin]
 *     summary: Reset password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset
 */
router.post("/reset-password", adminController.resetPassword);

/**
 * @swagger
 * /api/v1/admin_route/admins:
 *   get:
 *     tags: [Admin]
 *     summary: Get all admins
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admins
 */
router.get("/admins", authenticateToken, adminController.getAllAdmins);

/**
 * @swagger
 * /api/v1/admin_route/admins/{id}:
 *   get:
 *     tags: [Admin]
 *     summary: Get admin by ID
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
 *         description: Admin details
 */
router.get("/admins/:id", authenticateToken, adminController.getAdminById);

module.exports = router;
