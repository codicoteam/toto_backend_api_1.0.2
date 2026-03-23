const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topic_in_subject_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: TopicInSubject
 *   description: Topics within subjects management
 */

/**
 * @swagger
 * /api/v1/topic-in-subject:
 *   get:
 *     tags: [TopicInSubject]
 *     summary: Get all topics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of topics
 */
router.get("/", authenticateToken, topicController.getAllTopics);

/**
 * @swagger
 * /api/v1/topic-in-subject/{id}:
 *   get:
 *     tags: [TopicInSubject]
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
 *         description: Topic details
 */
router.get("/:id", authenticateToken, topicController.getTopicById);

/**
 * @swagger
 * /api/v1/topic-in-subject/by-subject/{subjectId}:
 *   get:
 *     tags: [TopicInSubject]
 *     summary: Get topics by subject ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Topics for subject
 */
router.get("/by-subject/:subjectId", authenticateToken, topicController.getTopicsBySubjectId);

/**
 * @swagger
 * /api/v1/topic-in-subject/by-period/{period}:
 *   get:
 *     tags: [TopicInSubject]
 *     summary: Get topics by subscription period
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: period
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Monthly, Quarterly, Yearly, OneTime]
 *     responses:
 *       200:
 *         description: Topics by period
 */
router.get("/by-period/:period", authenticateToken, topicController.getBySubscriptionPeriod);

/**
 * @swagger
 * /api/v1/topic-in-subject/{id}/pricing:
 *   get:
 *     tags: [TopicInSubject]
 *     summary: Get topic with pricing info
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
 *         description: Topic with pricing
 */
router.get("/:id/pricing", authenticateToken, topicController.getWithPricing);

/**
 * @swagger
 * /api/v1/topic-in-subject:
 *   post:
 *     tags: [TopicInSubject]
 *     summary: Create topic
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
 *               - subject
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Introduction to Indices"
 *               description:
 *                 type: string
 *                 example: "Learn about indices and laws of indices"
 *               subject:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *               subjectName:
 *                 type: string
 *                 example: "Mathematics"
 *               showTopic:
 *                 type: boolean
 *                 default: true
 *               price:
 *                 type: number
 *                 example: 29.99
 *               regularPrice:
 *                 type: number
 *                 example: 49.99
 *               subscriptionPeriod:
 *                 type: string
 *                 enum: [Monthly, Quarterly, Yearly, OneTime]
 *                 default: "Monthly"
 *               order:
 *                 type: number
 *                 default: 0
 *               icon:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       201:
 *         description: Topic created
 */
router.post("/", authenticateToken, topicController.createTopic);

/**
 * @swagger
 * /api/v1/topic-in-subject/{id}:
 *   put:
 *     tags: [TopicInSubject]
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
 *         description: Topic updated
 */
router.put("/:id", authenticateToken, topicController.updateTopic);

/**
 * @swagger
 * /api/v1/topic-in-subject/{id}/visibility:
 *   patch:
 *     tags: [TopicInSubject]
 *     summary: Toggle topic visibility
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
 *             required:
 *               - showTopic
 *             properties:
 *               showTopic:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Visibility updated
 */
router.patch("/:id/visibility", authenticateToken, topicController.toggleVisibility);

/**
 * @swagger
 * /api/v1/topic-in-subject/{id}/order:
 *   patch:
 *     tags: [TopicInSubject]
 *     summary: Update topic order
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
 *             required:
 *               - order
 *             properties:
 *               order:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Order updated
 */
router.patch("/:id/order", authenticateToken, topicController.updateOrder);

/**
 * @swagger
 * /api/v1/topic-in-subject/bulk/order:
 *   put:
 *     tags: [TopicInSubject]
 *     summary: Bulk update topic order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - updates
 *             properties:
 *               updates:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     order:
 *                       type: number
 *     responses:
 *       200:
 *         description: Orders updated
 */
router.put("/bulk/order", authenticateToken, topicController.bulkUpdateOrder);

/**
 * @swagger
 * /api/v1/topic-in-subject/{id}:
 *   delete:
 *     tags: [TopicInSubject]
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
 *         description: Topic deleted
 */
router.delete("/:id", authenticateToken, topicController.deleteTopic);

module.exports = router;
