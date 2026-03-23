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
 * /api/v1/topic-content:
 *   get:
 *     tags: [TopicContent]
 *     summary: Get all topic contents
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contents
 */
router.get("/", authenticateToken, topicContentController.getAllContents);

/**
 * @swagger
 * /api/v1/topic-content/{id}:
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
 * /api/v1/topic-content/by-topic/{topicId}:
 *   get:
 *     tags: [TopicContent]
 *     summary: Get content by topic ID
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
 *         description: Content for topic
 */
router.get("/by-topic/:topicId", authenticateToken, topicContentController.getByTopicId);

/**
 * @swagger
 * /api/v1/topic-content/by-type/{contentType}:
 *   get:
 *     tags: [TopicContent]
 *     summary: Get content by type
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [lesson, video, quiz, assignment, resource]
 *     responses:
 *       200:
 *         description: Content by type
 */
router.get("/by-type/:contentType", authenticateToken, topicContentController.getByContentType);

/**
 * @swagger
 * /api/v1/topic-content/topic/{topicId}/lean:
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
router.get("/topic/:topicId/lean", authenticateToken, topicContentController.getLeanContentByTopicId);

/**
 * @swagger
 * /api/v1/topic-content:
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
 *               - topicId
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Algebra Basics"
 *               description:
 *                 type: string
 *                 example: "Introduction to algebra"
 *               topicId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *               contentType:
 *                 type: string
 *                 enum: [lesson, video, quiz, assignment, resource]
 *                 default: "lesson"
 *               content:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               file_path:
 *                 type: array
 *                 items:
 *                   type: string
 *               file_type:
 *                 type: string
 *                 enum: [pdf, video, audio, document, image, other]
 *               order:
 *                 type: number
 *                 default: 0
 *               duration:
 *                 type: number
 *                 description: Duration in minutes
 *     responses:
 *       201:
 *         description: Content created
 */
router.post("/", authenticateToken, topicContentController.createContent);

/**
 * @swagger
 * /api/v1/topic-content/{id}:
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
router.put("/:id", authenticateToken, topicContentController.updateContent);

/**
 * @swagger
 * /api/v1/topic-content/{id}/publish:
 *   patch:
 *     tags: [TopicContent]
 *     summary: Publish/unpublish content
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
 *             properties:
 *               publish:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Publish status updated
 */
router.patch("/:id/publish", authenticateToken, topicContentController.publishContent);

/**
 * @swagger
 * /api/v1/topic-content/{id}:
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
router.delete("/:id", authenticateToken, topicContentController.deleteContent);

/**
 * @swagger
 * /api/v1/topic-content/{contentId}/lessons:
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
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               duration:
 *                 type: number
 *               resources:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       201:
 *         description: Lesson added
 */
router.post("/:contentId/lessons", authenticateToken, topicContentController.addLesson);

/**
 * @swagger
 * /api/v1/topic-content/{contentId}/lessons/reorder:
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
router.put("/:contentId/lessons/reorder", authenticateToken, topicContentController.reorderLessons);

/**
 * @swagger
 * /api/v1/topic-content/{contentId}/lessons/{lessonId}:
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
router.patch("/:contentId/lessons/:lessonId", authenticateToken, topicContentController.updateLesson);

/**
 * @swagger
 * /api/v1/topic-content/{contentId}/lessons/{lessonId}:
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
router.delete("/:contentId/lessons/:lessonId", authenticateToken, topicContentController.deleteLesson);

/**
 * @swagger
 * /api/v1/topic-content/{contentId}/lessons/{lessonId}/info:
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
router.get("/:contentId/lessons/:lessonId/info", authenticateToken, topicContentController.getLessonInfo);

module.exports = router;
