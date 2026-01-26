const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student_controller");
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/student_route:
 *   get:
 *     summary: Get all items
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of items
 */
/**
 * @swagger
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *       404:
 *         description: Student not found
 */
router.get("/:id", authenticateToken, studentController.getStudentById);

/**
 * @swagger

 * tags:
 *   name: Student
 *   description: Student management
 * /api/v1/student_route/update/{id}:
 *   put:
 *     summary: Update student profile
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               address:
 *                 type: string
 *               school:
 *                 type: string
 *               subjects:
 *                 type: array
 *                 items:
 *                   type: string
 *               profile_picture:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       403:
 *         description: Can only update your own profile
 *       404:
 *         description: Student not found
 */
router.put("/update/:id", authenticateToken, studentController.updateStudent);

/**
 * @swagger
 * /api/v1/student_route/delete/{id}:
 *   delete:
 *     summary: Delete student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *       - role: [admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       403:
 *         description: Admin only
 *       404:
 *         description: Student not found
 */
router.delete("/delete/:id", authenticateToken, authorizeRoles('admin'), studentController.deleteStudent);

/**
 * @swagger
 * /api/v1/student_route/forgot-password:
 *   post:
 *     summary: Request password reset OTP
 *     tags: [Students]
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
 *         description: OTP sent successfully
 *       400:
 *         description: Student not found
 */
router.post("/forgot-password", studentController.forgotPassword);

/**
 * @swagger
 * /api/v1/student_route/verify-reset-otp:
 *   post:
 *     summary: Verify password reset OTP
 *     tags: [Students]
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
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 */
router.post("/verify-reset-otp", studentController.verifyResetOTP);

/**
 * @swagger
 * /api/v1/student_route/reset-password:
 *   post:
 *     summary: Reset password after OTP verification
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               newPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid request
 */
router.post("/reset-password", studentController.resetPassword);

/**
 * @swagger
 * /api/v1/student_route/progress/{id}:
 *   get:
 *     summary: Get student progress
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student progress retrieved successfully
 *       500:
 *         description: Error retrieving student progress
 */
router.get("/progress/:id", authenticateToken, studentController.getStudentProgress);

/**
 * @swagger
 * /api/v1/student_route/subscription/{id}:
 *   put:
 *     summary: Update subscription status
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *       - role: [admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subscription_status
 *             properties:
 *               subscription_status:
 *                 type: string
 *                 enum: [active, inactive, pending]
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *       403:
 *         description: Admin only
 *       400:
 *         description: Failed to update subscription
 */
router.put("/subscription/:id", authenticateToken, authorizeRoles('admin'), studentController.updateSubscription);

/**
 * @swagger
 * /api/v1/student_route/stats/{id}:
 *   get:
 *     summary: Get student statistics
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student statistics retrieved successfully
 *       500:
 *         description: Error retrieving student statistics
 */
router.get("/stats/:id", authenticateToken, studentController.getStudentStats);

/**
 * @swagger
 * /api/v1/student_route/search:
 *   get:
 *     summary: Search students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: Students search results
 *       400:
 *         description: Failed to search students
 */
router.get("/search", authenticateToken, studentController.searchStudents);

/**
 * @swagger
 * /api/v1/student_route/me:
 *   get:
 *     summary: Get current student profile
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current student profile retrieved successfully
 *       404:
 *         description: Student not found
 */
router.get("/me", authenticateToken, studentController.getCurrentStudent);

/**
 * @swagger
 * /api/v1/student_route/profile-picture/{id}:
 *   put:
 *     summary: Update profile picture status
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *       - role: [admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - profile_picture_status
 *             properties:
 *               profile_picture_status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *               profile_picture_rejection_reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile picture status updated successfully
 *       403:
 *         description: Admin only
 *       400:
 *         description: Failed to update profile picture status
 */
router.put("/profile-picture/:id", authenticateToken, authorizeRoles('admin'), studentController.updateProfilePictureStatus);

module.exports = router;
