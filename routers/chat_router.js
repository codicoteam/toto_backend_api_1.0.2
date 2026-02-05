const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat management endpoints
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
 * /api/v1/chat/:
 *   get:
 *     tags: [Chat]
 *     summary: Get all Chat records
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

router.get("/", authenticateToken, chatController.getAll);

/**
 * @swagger
 * /api/v1/chat/{id}:
 *   get:
 *     tags: [Chat]
 *     summary: Get Chat by ID
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

router.get("/:id", authenticateToken, chatController.getById);

/**
 * @swagger
 * /api/v1/chat/:
 *   post:
 *     tags: [Chat]
 *     summary: Create new Chat
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

router.post("/", authenticateToken, chatController.create);

/**
 * @swagger
 * /api/v1/chat/{id}:
 *   put:
 *     tags: [Chat]
 *     summary: Update Chat
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

router.put("/:id", authenticateToken, chatController.update);

/**
 * @swagger
 * /api/v1/chat/{id}:
 *   delete:
 *     tags: [Chat]
 *     summary: Delete Chat
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

router.delete("/:id", authenticateToken, chatController.delete);

router.get('/', authenticateToken, chatController.getAll);
router.post('/', authenticateToken, chatController.create);
module.exports = router;
