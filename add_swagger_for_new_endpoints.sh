#!/bin/bash

echo "Adding Swagger documentation for new teacher-related endpoints..."

# Add to teacher_router.js
cat >> routers/teacher_router.js << 'TEACHER_SWAGGER'

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
TEACHER_SWAGGER

echo "✅ Added comprehensive Swagger docs to teacher router"
