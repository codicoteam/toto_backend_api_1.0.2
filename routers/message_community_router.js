const express = require("express");
const router = express.Router();
const message_communityController = require("../controllers/message_community_controller");

/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Message management endpoints
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

// Basic CRUD routes

/**
 * @swagger
 * /api/v1/message:
 *   get:
 *     tags:
 *       - Message
 *     summary: Get all Message records
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
router.get("/", authenticateToken, message_communityController.getAll);

/**
 * @swagger
 * /api/v1/message/{id}:
 *   get:
 *     tags:
 *       - Message
 *     summary: Get Message by ID
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
router.get("/:id", authenticateToken, message_communityController.getById);

/**
 * @swagger
 * /api/v1/message:
 *   post:
 *     tags:
 *       - Message
 *     summary: Create new Message
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
router.post("/", authenticateToken, message_communityController.create);

/**
 * @swagger
 * /api/v1/message/{id}:
 *   put:
 *     tags:
 *       - Message
 *     summary: Update Message
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
router.put("/:id", authenticateToken, message_communityController.update);

/**
 * @swagger
 * /api/v1/message/{id}:
 *   delete:
 *     tags:
 *       - Message
 *     summary: Delete Message
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
router.delete("/:id", authenticateToken, message_communityController.delete);

router.get('/', authenticateToken, message_communityController.getAll);
router.post('/', authenticateToken, message_communityController.create);
module.exports = router;
