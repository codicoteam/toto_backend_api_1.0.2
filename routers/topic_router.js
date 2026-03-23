const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topic_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Topic
 *   description: Topic management
 */

/**
 * @swagger
 * /api/v1/topic:
 *   get:
 *     tags: [Topic]
 *     summary: Get all topic records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", authenticateToken, topicController.getAllTopics);

/**
 * @swagger
 * /api/v1/topic/{id}:
 *   get:
 *     tags: [Topic]
 *     summary: Get topic by ID
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
router.get("/:id", authenticateToken, topicController.getTopicById);

/**
 * @swagger
 * /api/v1/topic:
 *   post:
 *     tags: [Topic]
 *     summary: Create new topic
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Introduction to Algebra"
 *                 description: Topic title (required)
 *               description:
 *                 type: string
 *                 example: "Basic algebra concepts including variables and equations"
 *                 description: Topic description (optional)
 *               subjectId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *                 description: MongoDB ObjectId of the subject (optional)
 *               order:
 *                 type: number
 *                 example: 1
 *                 description: Display order (optional, defaults to 0)
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: "active"
 *                 description: Topic status (optional, defaults to active)
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post("/", authenticateToken, topicController.createTopic);

/**
 * @swagger
 * /api/v1/topic/{id}:
 *   put:
 *     tags: [Topic]
 *     summary: Update topic
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
router.put("/:id", authenticateToken, topicController.updateTopic);

/**
 * @swagger
 * /api/v1/topic/{id}:
 *   delete:
 *     tags: [Topic]
 *     summary: Delete topic
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
router.delete("/:id", authenticateToken, topicController.deleteTopic);

module.exports = router;
