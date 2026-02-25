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
 * /api/v1/topic_in_subject/create:
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
 *               subject:
 *                 type: string
 *               subjectName:
 *                 type: string
 *               showTopic:
 *                 type: boolean
 *                 default: true
 *               price:
 *                 type: number
 *               regularPrice:
 *                 type: number
 *               subscriptionPeriod:
 *                 type: string
 *                 enum: [Monthly, Quarterly, Yearly]
 *     responses:
 *       201:
 *         description: Topic created
 */
router.post("/create", authenticateToken, topicController.createTopic);

/**
 * @swagger
 * /api/v1/topic_in_subject/getall:
 *   get:
 *     tags: [TopicInSubject]
 *     summary: Get all topics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of topics
 */
router.get("/getall", authenticateToken, topicController.getAllTopics);

/**
 * @swagger
 * /api/v1/topic_in_subject/gettopicbysubjectid/{subjectId}:
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
router.get("/gettopicbysubjectid/:subjectId", authenticateToken, topicController.getTopicsBySubjectId);

/**
 * @swagger
 * /api/v1/topic_in_subject/visibility/{id}:
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
router.patch("/visibility/:id", authenticateToken, topicController.toggleVisibility);

/**
 * @swagger
 * /api/v1/topic_in_subject/update/{id}:
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
router.put("/update/:id", authenticateToken, topicController.updateTopic);

/**
 * @swagger
 * /api/v1/topic_in_subject/delete/{id}:
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
router.delete("/delete/:id", authenticateToken, topicController.deleteTopic);

module.exports = router;
