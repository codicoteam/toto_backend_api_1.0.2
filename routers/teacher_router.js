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
 * /api/v1/teacher_route/signup:
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
 * /api/v1/teacher_route/login:
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
 * /api/v1/teacher_route/getallteachers:
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
 * /api/v1/teacher_route/updateteacher/{id}:
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
 * /api/v1/teacher_route/deleteteacher/{id}:
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
