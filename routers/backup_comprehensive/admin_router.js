const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/admin_route:
 *   get:
 *     summary: Get all items
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of items
 */
/**
 * @swagger
 *   get:
 *     summary: Get admin by email
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin email
 *     responses:
 *       200:
 *         description: Admin retrieved successfully
 *       404:
 *         description: Admin not found
 */
router.get("/getadmin/:email", authenticateToken, adminController.getAdminByEmail);

/**
 * @swagger

 * tags:
 *   name: Admin
 *   description: Admin management
 * /api/v1/admin_route/updateadmin/{id}:
 *   put:
 *     summary: Update admin profile
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
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
 *               contactNumber:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *       404:
 *         description: Admin not found
 */
router.put("/updateadmin/:id", authenticateToken, adminController.updateAdmin);

/**
 * @swagger
 * /api/v1/admin_route/deleteadmin/{id}:
 *   delete:
 *     summary: Delete admin
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *       - role: [main admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Admin not found
 */
router.delete("/deleteadmin/:id", authenticateToken, authorizeRoles('main admin'), adminController.deleteAdmin);

/**
 * @swagger
 * /api/v1/admin_route/admins/{id}:
 *   get:
 *     summary: Get admin by ID
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin retrieved successfully
 *       404:
 *         description: Admin not found
 */
router.get("/admins/:id", authenticateToken, adminController.getAdminById);

/**
 * @swagger
 * /api/v1/admin_route/forgot-password:
 *   post:
 *     summary: Request password reset OTP
 *     tags: [Admins]
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
 *         description: Admin not found
 */
router.post("/forgot-password", adminController.forgotPassword);

/**
 * @swagger
 * /api/v1/admin_route/verify-reset-otp:
 *   post:
 *     summary: Verify password reset OTP
 *     tags: [Admins]
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
router.post("/verify-reset-otp", adminController.verifyResetOTP);

/**
 * @swagger
 * /api/v1/admin_route/reset-password:
 *   post:
 *     summary: Reset password after OTP verification
 *     tags: [Admins]
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
router.post("/reset-password", adminController.resetPassword);

/**
 * @swagger
 * /api/v1/admin_route/create-admin:
 *   post:
 *     summary: Create new admin (main admin only)
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *       - role: [main admin]
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
 *               - role
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
 *                 format: password
 *               contactNumber:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [teacher, main admin]
 *     responses:
 *       201:
 *         description: New admin created successfully
 *       403:
 *         description: Not authorized
 *       409:
 *         description: Email already exists
 */
router.post("/create-admin", authenticateToken, authorizeRoles('main admin'), adminController.createAdmin);

/**
 * @swagger
 * /api/v1/admin_route/add-admin/{communityId}:
 *   post:
 *     summary: Add admin to community
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *         description: Community ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - adminId
 *             properties:
 *               adminId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin added to community successfully
 *       400:
 *         description: Failed to add admin
 */
router.post("/add-admin/:communityId", authenticateToken, adminController.addAdminToCommunity);

/**
 * @swagger
 * /api/v1/admin_route/remove-admin/{communityId}:
 *   post:
 *     summary: Remove admin from community
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *         description: Community ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - adminId
 *             properties:
 *               adminId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin removed from community successfully
 *       400:
 *         description: Failed to remove admin
 */
router.post("/remove-admin/:communityId", authenticateToken, adminController.removeAdminFromCommunity);

/**
 * @swagger
 * /api/v1/admin_route/remove-student/{communityId}:
 *   post:
 *     summary: Remove student from community
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *         description: Community ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *             properties:
 *               studentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student removed from community successfully
 *       400:
 *         description: Failed to remove student
 */
router.post("/remove-student/:communityId", authenticateToken, adminController.removeStudentFromCommunity);

module.exports = router;
