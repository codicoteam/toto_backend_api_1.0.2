const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher_controller");
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");

/**
 * @swagger
 *   get:
 *     summary: Get teacher by ID
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Teacher retrieved successfully
 *       404:
 *         description: Teacher not found
 */
router.get("/:id", authenticateToken, teacherController.getTeacherById);

/**
 * @swagger

 * tags:
 *   name: Teacher
 *   description: Teacher management
 * /api/v1/teacher/{id}:
 *   put:
 *     summary: Update teacher profile
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher ID
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
 *               bio:
 *                 type: string
 *               qualifications:
 *                 type: array
 *                 items:
 *                   type: string
 *               profile_pic_url:
 *                 type: string
 *               cover_photo_url:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               specialization:
 *                 type: array
 *                 items:
 *                   type: string
 *               experience_years:
 *                 type: number
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *       403:
 *         description: Forbidden - can only update own profile
 *       404:
 *         description: Teacher not found
 */
router.put("/:id", authenticateToken, teacherController.updateTeacher);

/**
 * @swagger
 * /api/v1/teacher/{id}:
 *   delete:
 *     summary: Deactivate teacher (soft delete)
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *       - role: [admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Teacher deactivated successfully
 *       403:
 *         description: Forbidden - admin only
 *       404:
 *         description: Teacher not found
 */
router.delete("/:id", authenticateToken, authorizeRoles('admin'), teacherController.deleteTeacher);

/**
 * @swagger
 * /api/v1/teacher/{id}/activate:
 *   put:
 *     summary: Activate teacher
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *       - role: [admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Teacher activated successfully
 *       403:
 *         description: Forbidden - admin only
 *       404:
 *         description: Teacher not found
 */
router.put("/:id/activate", authenticateToken, authorizeRoles('admin'), teacherController.activateTeacher);

/**
 * @swagger
 * /api/v1/teacher/{id}/stats:
 *   get:
 *     summary: Get teacher statistics
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *       404:
 *         description: Teacher not found
 */
router.get("/:id/stats", authenticateToken, teacherController.getTeacherStats);

module.exports = router;
/**
 * @swagger
 * /api/v1/teacher:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of teachers per page
 *     responses:
 *       200:
 *         description: List of teachers
 */
router.get("/", authenticateToken, teacherController.getAllTeachers);

/**
 * @swagger
 * /api/v1/teacher/current:
 *   get:
 *     summary: Get current teacher profile
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current teacher profile
 *       401:
 *         description: Not authenticated
 */
router.get("/current", authenticateToken, teacherController.getCurrentTeacher);

/**
 * @swagger
 * /api/v1/teacher/login:
 *   post:
 *     summary: Teacher login
 *     tags: [Authentication]
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", teacherController.loginTeacher);

/**
 * @swagger
 * /api/v1/teacher/register:
 *   post:
 *     summary: Register new teacher
 *     tags: [Authentication]
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
 *               password:
 *                 type: string
 *               bio:
 *                 type: string
 *               qualifications:
 *                 type: array
 *                 items:
 *                   type: string
 *               contactNumber:
 *                 type: string
 *               specialization:
 *                 type: array
 *                 items:
 *                   type: string
 *               experience_years:
 *                 type: number
 *     responses:
 *       201:
 *         description: Teacher registered successfully
 *       400:
 *         description: Registration failed
 */
router.post("/register", teacherController.registerTeacher);
