const express = require("express");
const router = express.Router();
const comment_contentController = require("../controllers/comment_content_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Comment_content
 *   description: Comment_content management
 */

/**
 * @swagger
 * /api/v1/comment_content:
 *   get:
 *     tags: [Comment_content]
 *     summary: Get all comment_content records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", authenticateToken, comment_contentController.getAll);

/**
 * @swagger
 * /api/v1/comment_content/{id}:
 *   get:
 *     tags: [Comment_content]
 *     summary: Get comment_content by ID
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
 *         description: Success
 */
router.get("/:id", authenticateToken, comment_contentController.getById);

/**
 * @swagger
 * /api/v1/comment_content:
 *   post:
 *     tags: [Comment_content]
 *     summary: Create new comment_content
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
 *         description: Created successfully
 */
router.post("/", authenticateToken, comment_contentController.create);

/**
 * @swagger
 * /api/v1/comment_content/{id}:
 *   put:
 *     tags: [Comment_content]
 *     summary: Update comment_content
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
 *         description: Updated successfully
 */
router.put("/:id", authenticateToken, comment_contentController.update);

/**
 * @swagger
 * /api/v1/comment_content/{id}:
 *   delete:
 *     tags: [Comment_content]
 *     summary: Delete comment_content
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
 *         description: Deleted successfully
 */
router.delete("/:id", authenticateToken, comment_contentController.delete);

module.exports = router;
