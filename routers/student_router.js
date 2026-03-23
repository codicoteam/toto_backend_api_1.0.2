const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student management
 */

/**
 * @swagger
 * /api/v1/student/signup:
 *   post:
 *     tags: [Student]
 *     summary: Student signup
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
 *               - phone_number
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Makaza"
 *               lastName:
 *                 type: string
 *                 example: "Makza"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "student@example.com"
 *               phone_number:
 *                 type: string
 *                 example: "+263788647705"
 *               password:
 *                 type: string
 *                 format: password
 *               level:
 *                 type: string
 *                 example: "A Level"
 *               address:
 *                 type: string
 *               school:
 *                 type: string
 *               subjects:
 *                 type: array
 *                 items:
 *                   type: string
 *               subscription_status:
 *                 type: string
 *                 default: "active"
 *               next_of_kin_full_name:
 *                 type: string
 *               next_of_kin_phone_number:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student registered successfully
 */
router.post("/signup", studentController.registerStudent);

/**
 * @swagger
 * /api/v1/student/login:
 *   post:
 *     tags: [Student]
 *     summary: Student login
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
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", studentController.loginStudent);

/**
 * @swagger
 * /api/v1/student/forgot_password:
 *   post:
 *     tags: [Student]
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
router.post("/forgot_password", studentController.forgotPassword);

/**
 * @swagger
 * /api/v1/student/verify-reset-otp:
 *   post:
 *     tags: [Student]
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
router.post("/verify-reset-otp", studentController.verifyResetOTP);

/**
 * @swagger
 * /api/v1/student/reset-password:
 *   post:
 *     tags: [Student]
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
 *                 format: password
 *     responses:
 *       200:
 *         description: Password reset
 */
router.post("/reset-password", studentController.resetPassword);

/**
 * @swagger
 * /api/v1/student/getallstudents:
 *   get:
 *     tags: [Student]
 *     summary: Get all students
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 */
router.get("/getallstudents", authenticateToken, studentController.getAllStudents);

/**
 * @swagger
 * /api/v1/student/updatestudent/{id}:
 *   put:
 *     tags: [Student]
 *     summary: Update student
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
 *         description: Student updated
 */
router.put("/updatestudent/:id", authenticateToken, studentController.updateStudent);

/**
 * @swagger
 * /api/v1/student/verify-otp:
 *   post:
 *     tags: [Student]
 *     summary: Verify OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone_number
 *               - otpCode
 *             properties:
 *               phone_number:
 *                 type: string
 *                 example: "+263712494841"
 *               otpCode:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified
 */
router.post("/verify-otp", studentController.verifyOTP);

module.exports = router;
