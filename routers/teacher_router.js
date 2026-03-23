const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: Teacher management
 */

/**
 * @swagger
 * /api/v1/teacher/signup:
 *   post:
 *     tags: [Teacher]
 *     summary: Teacher signup
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
 *               phone_number:
 *                 type: string
 *               subjects:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Teacher registered
 */
router.post("/signup", teacherController.registerTeacher);

/**
 * @swagger
 * /api/v1/teacher/login:
 *   post:
 *     tags: [Teacher]
 *     summary: Teacher login
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
 */
router.post("/login", teacherController.loginTeacher);

/**
 * @swagger
 * /api/v1/teacher/getallteachers:
 *   get:
 *     tags: [Teacher]
 *     summary: Get all teachers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of teachers
 */
router.get("/getallteachers", authenticateToken, teacherController.getAllTeachers);

/**
 * @swagger
 * /api/v1/teacher/updateteacher/{id}:
 *   put:
 *     tags: [Teacher]
 *     summary: Update teacher
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
 *         description: Teacher updated
 */
router.put("/updateteacher/:id", authenticateToken, teacherController.updateTeacher);

/**
 * @swagger
 * /api/v1/teacher/deleteteacher/{id}:
 *   delete:
 *     tags: [Teacher]
 *     summary: Delete teacher
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
 *         description: Teacher deleted
 */
router.delete("/deleteteacher/:id", authenticateToken, teacherController.deleteTeacher);

module.exports = router;

/**
 * @swagger
 * /api/v1/teacher/forgot-password:
 *   post:
 *     tags: [Teacher]
 *     summary: Forgot password - send OTP
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
 *                 example: teacher@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
router.post("/forgot-password", teacherController.forgotPassword);

/**
 * @swagger
 * /api/v1/teacher/verify-otp:
 *   post:
 *     tags: [Teacher]
 *     summary: Verify OTP
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
 *                 example: teacher@example.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified
 */
router.post("/verify-otp", teacherController.verifyOTP);

/**
 * @swagger
 * /api/v1/teacher/verify-reset-otp:
 *   post:
 *     tags: [Teacher]
 *     summary: Verify reset OTP (alias for verify-otp)
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
 *                 example: teacher@example.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified
 */
router.post("/verify-reset-otp", teacherController.verifyResetOTP);

/**
 * @swagger
 * /api/v1/teacher/reset-password:
 *   post:
 *     tags: [Teacher]
 *     summary: Reset password with OTP
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
 *                 example: teacher@example.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
router.post("/reset-password", teacherController.resetPassword);

/**
 * @swagger
 * /api/v1/teacher/resend-otp:
 *   post:
 *     tags: [Teacher]
 *     summary: Resend OTP
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
 *                 example: teacher@example.com
 *     responses:
 *       200:
 *         description: OTP resent
 */
router.post("/resend-otp", teacherController.resendOTP);
