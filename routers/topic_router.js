const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topic_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Topic
 *   description: Topic management endpoints
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
 * /api/v1/topic/:
 *   post:
 *     tags: [Topic]
 *     summary: Create new Topic
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

router.post("/", authenticateToken, topicController.createTopic);

/**
 * @swagger
 * /api/v1/topic/:
 *   get:
 *     tags: [Topic]
 *     summary: Get all Topic records
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

router.get("/", authenticateToken, topicController.getAllTopics);

/**
 * @swagger
 * /api/v1/topic/{id}:
 *   get:
 *     tags: [Topic]
 *     summary: Get Topic by ID
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

router.get("/:id", authenticateToken, topicController.getTopicById);

/**
 * @swagger
 * /api/v1/topic/{id}:
 *   put:
 *     tags: [Topic]
 *     summary: Update Topic
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

router.put("/:id", authenticateToken, topicController.updateTopic);

/**
 * @swagger
 * /api/v1/topic/{id}:
 *   delete:
 *     tags: [Topic]
 *     summary: Delete Topic
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

router.delete("/:id", authenticateToken, topicController.deleteTopic);

/**
 * @swagger
 * /api/v1/topic/{subject}:
 *   get:
 *     tags: [Topic]
 *     summary: Get Topic by subject
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subject
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

router.get("/:subject", authenticateToken, topicController.getTopicsBySubject);

module.exports = router;
