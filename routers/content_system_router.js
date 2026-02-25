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
 * /api/v1/content_system/create:
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
 *     responses:
 *       201:
 *         description: Content created
 */
router.post("/create", authenticateToken, contentController.createContent);

/**
 * @swagger
 * /api/v1/content_system/getall:
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
 * /api/v1/content_system/get/{id}:
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
 * /api/v1/content_system/update/{id}:
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
 * /api/v1/content_system/delete/{id}:
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
