const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student_controller");

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student management endpoints
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

// Student login

/**
 * @swagger
 * /api/v1/student:
 *   post:
 *     tags:
 *       - Student
 *     summary: Create new Student
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
router.post("/login", studentController.loginStudent);

// Student registration

/**
 * @swagger
 * /api/v1/student:
 *   post:
 *     tags:
 *       - Student
 *     summary: Create new Student
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
router.post("/register", studentController.registerStudent);

// Get all students

/**
 * @swagger
 * /api/v1/student:
 *   get:
 *     tags:
 *       - Student
 *     summary: Get all Student records
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
router.get("/", authenticateToken, studentController.getAllStudents);

// Get student by ID

/**
 * @swagger
 * /api/v1/student/{id}:
 *   get:
 *     tags:
 *       - Student
 *     summary: Get Student by ID
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
router.get("/:id", authenticateToken, studentController.getStudentById);

// Update student

/**
 * @swagger
 * /api/v1/student/{id}:
 *   put:
 *     tags:
 *       - Student
 *     summary: Update Student
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
router.put("/:id", authenticateToken, studentController.updateStudent);

// Delete student

/**
 * @swagger
 * /api/v1/student/{id}:
 *   delete:
 *     tags:
 *       - Student
 *     summary: Delete Student
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
router.delete("/:id", authenticateToken, studentController.deleteStudent);

// Forgot password

/**
 * @swagger
 * /api/v1/student:
 *   post:
 *     tags:
 *       - Student
 *     summary: Create new Student
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
router.post("/forgot-password", studentController.forgotPassword);

// Verify reset OTP

/**
 * @swagger
 * /api/v1/student:
 *   post:
 *     tags:
 *       - Student
 *     summary: Create new Student
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
router.post("/verify-reset-otp", studentController.verifyResetOTP);

// Reset password

/**
 * @swagger
 * /api/v1/student:
 *   post:
 *     tags:
 *       - Student
 *     summary: Create new Student
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
router.post("/reset-password", studentController.resetPassword);

// Get student progress

/**
 * @swagger
 * /api/v1/student/{id}:
 *   get:
 *     tags:
 *       - Student
 *     summary: Get Student by ID
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
router.get("/:id/progress", authenticateToken, studentController.getStudentProgress);

// Update subscription

/**
 * @swagger
 * /api/v1/student/{id}:
 *   put:
 *     tags:
 *       - Student
 *     summary: Update Student
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
router.put("/:id/subscription", authenticateToken, studentController.updateSubscription);

// Get student stats

/**
 * @swagger
 * /api/v1/student/{id}:
 *   get:
 *     tags:
 *       - Student
 *     summary: Get Student by ID
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
router.get("/:id/stats", authenticateToken, studentController.getStudentStats);

// Search students
router.get("/search", authenticateToken, studentController.searchStudents);

// Get current student profile
router.get("/profile/me", authenticateToken, studentController.getCurrentStudent);

// Update profile picture status (admin only)

/**
 * @swagger
 * /api/v1/student/{id}:
 *   put:
 *     tags:
 *       - Student
 *     summary: Update Student
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
router.put("/:id/profile-picture-status", authenticateToken, studentController.updateProfilePictureStatus);

router.get('/', authenticateToken, studentController.getAll);
router.post('/', authenticateToken, studentController.create);
module.exports = router;
