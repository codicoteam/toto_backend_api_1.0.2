const express = require("express");
const router = express.Router();
const contentController = require("../controllers/content_system_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: ContentSystem
 *   description: Content system management
 */

/**
 * @swagger
 * /api/v1/content-system/create:
 *   post:
 *     tags: [ContentSystem]
 *     summary: Create content
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
 *               - description
 *               - file_path
 *               - file_type
 *               - subject
 *               - level
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Introduction to Algebra"
 *               description:
 *                 type: string
 *                 example: "Basic algebra concepts for beginners"
 *               file_path:
 *                 type: string
 *                 example: "/uploads/algebra.pdf"
 *               file_type:
 *                 type: string
 *                 enum: [video, audio, document]
 *                 example: "document"
 *               subject:
 *                 type: string
 *                 example: "Mathematics"
 *               level:
 *                 type: string
 *                 enum: ["O Level", "A Level", "Form 1", "Form 2", "Form 3", "Form 4"]
 *                 example: "O Level"
 *     responses:
 *       201:
 *         description: Content created
 */
router.post("/create", authenticateToken, contentController.createContent);

/**
 * @swagger
 * /api/v1/content-system/getall:
 *   get:
 *     tags: [ContentSystem]
 *     summary: Get all content
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of content
 */
router.get("/getall", authenticateToken, contentController.getAllContent);

/**
 * @swagger
 * /api/v1/content-system/get/{id}:
 *   get:
 *     tags: [ContentSystem]
 *     summary: Get content by ID
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
 *         description: Content details
 */
router.get("/get/:id", authenticateToken, contentController.getContentById);

/**
 * @swagger
 * /api/v1/content-system/update/{id}:
 *   put:
 *     tags: [ContentSystem]
 *     summary: Update content
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
 *         description: Content updated
 */
router.put("/update/:id", authenticateToken, contentController.updateContent);

/**
 * @swagger
 * /api/v1/content-system/delete/{id}:
 *   delete:
 *     tags: [ContentSystem]
 *     summary: Delete content
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
 *         description: Content deleted
 */
router.delete("/delete/:id", authenticateToken, contentController.deleteContent);

module.exports = router;
