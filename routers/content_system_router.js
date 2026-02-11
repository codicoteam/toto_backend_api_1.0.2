const express = require("express");
const router = express.Router();
const contentSystemController = require("../controllers/content_system_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: ContentSystem
 *   description: Content System management endpoints
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
 * /api/v1/content-system/:
 *   get:
 *     tags: [ContentSystem]
 *     summary: Get all content systems
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get("/", authenticateToken, contentSystemController.getAll);

/**
 * @swagger
 * /api/v1/content-system/:
 *   post:
 *     tags: [ContentSystem]
 *     summary: Create new content system
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.post("/", authenticateToken, contentSystemController.create);

/**
 * @swagger
 * /api/v1/content-system/{id}:
 *   get:
 *     tags: [ContentSystem]
 *     summary: Get content system by ID
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authenticateToken, contentSystemController.getById);

/**
 * @swagger
 * /api/v1/content-system/{id}:
 *   put:
 *     tags: [ContentSystem]
 *     summary: Update content system
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
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authenticateToken, contentSystemController.update);

/**
 * @swagger
 * /api/v1/content-system/{id}:
 *   delete:
 *     tags: [ContentSystem]
 *     summary: Delete content system
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", authenticateToken, contentSystemController.delete);

module.exports = router;
