const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - regularPrice
 *         - projectFileUrl
 *         - coverPhotoUrl
 *         - subject
 *         - level
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         title:
 *           type: string
 *           description: Project title
 *         description:
 *           type: string
 *           description: Project description
 *         price:
 *           type: number
 *           description: Current price
 *         regularPrice:
 *           type: number
 *           description: Original price
 *         projectFileUrl:
 *           type: string
 *           description: URL to project file
 *         coverPhotoUrl:
 *           type: string
 *           description: URL to cover photo
 *         files:
 *           type: array
 *           items:
 *             type: string
 *           description: Additional files
 *         subject:
 *           type: string
 *           description: Subject ID
 *         level:
 *           type: string
 *           enum: [O Level, A Level, Others]
 *           description: Education level
 *         createdBy:
 *           type: string
 *           description: Admin ID who created
 *         purchasedBy:
 *           type: array
 *           items:
 *             type: string
 *           description: Student IDs who purchased
 *         paymentStatus:
 *           type: boolean
 *           description: Payment status
 *         showProject:
 *           type: boolean
 *           description: Whether to show project
 *         isDeleted:
 *           type: boolean
 *           description: Soft delete flag
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/project:
 *   get:
 *     summary: Get all projects
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", authenticateToken, projectController.getAllProjects);

/**
 * @swagger
 * /api/v1/project/purchased/me:
 *   get:
 *     summary: Get purchased projects for current student
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Purchased projects retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/purchased/me", authenticateToken, projectController.getPurchasedProjects);

/**
 * @swagger
 * /api/v1/project/subject/{subjectId}:
 *   get:
 *     summary: Get projects by subject ID
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/subject/:subjectId", authenticateToken, projectController.getProjectsBySubjectId);

/**
 * @swagger
 * /api/v1/project/level/{level}:
 *   get:
 *     summary: Get projects by level
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: level
 *         required: true
 *         schema:
 *           type: string
 *           enum: [O Level, A Level, Others]
 *         description: Education level
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/level/:level", authenticateToken, projectController.getProjectsByLevel);

/**
 * @swagger
 * /api/v1/project/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 */
router.get("/:id", authenticateToken, projectController.getProjectById);

/**
 * @swagger
 * /api/v1/project:
 *   post:
 *     summary: Create a new project (Admin only)
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - regularPrice
 *               - projectFileUrl
 *               - coverPhotoUrl
 *               - subject
 *               - level
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               regularPrice:
 *                 type: number
 *               projectFileUrl:
 *                 type: string
 *               coverPhotoUrl:
 *                 type: string
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *               subject:
 *                 type: string
 *               level:
 *                 type: string
 *                 enum: [O Level, A Level, Others]
 *               showProject:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Failed to create project
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.post("/", authenticateToken, projectController.createProject);

/**
 * @swagger
 * /api/v1/project/{id}:
 *   put:
 *     summary: Update project (Admin only)
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               regularPrice:
 *                 type: number
 *               projectFileUrl:
 *                 type: string
 *               coverPhotoUrl:
 *                 type: string
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *               subject:
 *                 type: string
 *               level:
 *                 type: string
 *               showProject:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Failed to update project
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Project not found
 */
router.put("/:id", authenticateToken, projectController.updateProject);

/**
 * @swagger
 * /api/v1/project/{id}:
 *   delete:
 *     summary: Delete project (soft delete - Admin only)
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Failed to delete project
 */
router.delete("/:id", authenticateToken, projectController.deleteProject);

/**
 * @swagger
 * /api/v1/project/{id}/purchase:
 *   post:
 *     summary: Purchase a project (Student only)
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project purchased successfully
 *       400:
 *         description: Failed to purchase project
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Student access required
 *       404:
 *         description: Project not found
 */
router.post("/:id/purchase", authenticateToken, projectController.purchaseProject);

module.exports = router;
