const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management endpoints
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

/**
 * @swagger
 * /api/v1/admin/login:
 *   post:
 *     tags: [Admin]
 *     summary: Admin login
 *     description: Authenticate admin and return JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
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
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", adminController.loginAdmin);

/**
 * @swagger
 * /api/v1/admin/register:
 *   post:
 *     tags: [Admin]
 *     summary: Register new admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Admin registered successfully
 */
router.post("/register", authenticateToken, adminController.registerAdmin);

/**
 * @swagger
 * /api/v1/admin:
 *   get:
 *     tags: [Admin]
 *     summary: Get all admins
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all admins
 */
router.get("/", authenticateToken, adminController.getAllAdmins);

/**
 * @swagger
 * /api/v1/admin/{id}:
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
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin details
 */
router.get("/:id", authenticateToken, adminController.getAdminById);

/**
 * @swagger
 * /api/v1/admin/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Update admin
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin updated successfully
 */
router.put("/:id", authenticateToken, adminController.updateAdmin);

/**
 * @swagger
 * /api/v1/admin/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: Delete admin
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
 *         description: Admin deleted successfully
 */
router.delete("/:id", authenticateToken, adminController.deleteAdmin);

/**
 * @swagger
 * /api/v1/admin/all:
 *   get:
 *     tags: [Admin]
 *     summary: Get all admins (alias)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admins
 */
router.get("/all", authenticateToken, adminController.getAll);

/**
 * @swagger
 * /api/v1/admin/create:
 *   post:
 *     tags: [Admin]
 *     summary: Create admin (alias)
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
 *         description: Admin created
 */
router.post("/create", authenticateToken, adminController.create);

module.exports = router;
