const express = require("express");
const router = express.Router();
const topicContentController = require("../controllers/topic_content_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: TopicContent
 *   description: Topic content management
 */

/**
 * @swagger
 * /api/v1/topic_content/create:
 *   post:
 *     tags: [TopicContent]
 *     summary: Create topic content
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
 *               - Topic
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               lesson:
 *                 type: array
 *                 items:
 *                   type: object
 *               file_path:
 *                 type: array
 *                 items:
 *                   type: string
 *               file_type:
 *                 type: string
 *               Topic:
 *                 type: string
 *     responses:
 *       201:
 *         description: Content created
 */
router.post("/create", authenticateToken, topicContentController.createContent);

/**
 * @swagger
 * /api/v1/topic_content/getall:
 *   get:
 *     tags: [TopicContent]
 *     summary: Get all topic contents
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contents
 */
router.get("/getall", authenticateToken, topicContentController.getAllContents);

/**
 * @swagger
 * /api/v1/topic_content/{id}:
 *   get:
 *     tags: [TopicContent]
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
router.get("/:id", authenticateToken, topicContentController.getContentById);

/**
 * @swagger
 * /api/v1/topic_content/update/{id}:
 *   put:
 *     tags: [TopicContent]
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
router.put("/update/:id", authenticateToken, topicContentController.updateContent);

/**
 * @swagger
 * /api/v1/topic_content/delete/{id}:
 *   delete:
 *     tags: [TopicContent]
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
router.delete("/delete/:id", authenticateToken, topicContentController.deleteContent);

/**
 * @swagger
 * /api/v1/topic_content/topic-contents/{contentId}/lessons:
 *   post:
 *     tags: [TopicContent]
 *     summary: Add lesson to content
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
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
 *       201:
 *         description: Lesson added
 */
router.post("/topic-contents/:contentId/lessons", authenticateToken, topicContentController.addLesson);

/**
 * @swagger
 * /api/v1/topic_content/topic-contents/{contentId}/lessons/reorder:
 *   put:
 *     tags: [TopicContent]
 *     summary: Reorder lessons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Lessons reordered
 */
router.put("/topic-contents/:contentId/lessons/reorder", authenticateToken, topicContentController.reorderLessons);

/**
 * @swagger
 * /api/v1/topic_content/topic-contents/{contentId}/lessons/{lessonId}:
 *   patch:
 *     tags: [TopicContent]
 *     summary: Update lesson
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: lessonId
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
 *         description: Lesson updated
 */
router.patch("/topic-contents/:contentId/lessons/:lessonId", authenticateToken, topicContentController.updateLesson);

/**
 * @swagger
 * /api/v1/topic_content/topic-contents/{contentId}/lessons/{lessonId}:
 *   delete:
 *     tags: [TopicContent]
 *     summary: Delete lesson
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson deleted
 */
router.delete("/topic-contents/:contentId/lessons/:lessonId", authenticateToken, topicContentController.deleteLesson);

/**
 * @swagger
 * /api/v1/topic_content/topic-contents/topic/{topicId}/lean:
 *   get:
 *     tags: [TopicContent]
 *     summary: Get lean content by topic ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Content details
 */
router.get("/topic-contents/topic/:topicId/lean", authenticateToken, topicContentController.getLeanContentByTopicId);

/**
 * @swagger
 * /api/v1/topic_content/lessonInfo/{contentId}/{lessonId}:
 *   get:
 *     tags: [TopicContent]
 *     summary: Get lesson info
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson info
 */
router.get("/lessonInfo/:contentId/:lessonId", authenticateToken, topicContentController.getLessonInfo);

module.exports = router;
