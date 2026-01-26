const express = require("express");
const router = express.Router();
const topicContentController = require("../controllers/topic_content_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 *   get:
 *     summary: Get topic content by ID
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *     responses:
 *       200:
 *         description: Topic content retrieved successfully
 *       404:
 *         description: Topic content not found
 */
router.get("/:id", authenticateToken, topicContentController.getTopicContentById);

/**
 * @swagger

 * tags:
 *   name: Topic Content
 *   description: Topic Content management
 * /api/v1/topic_content/by-topic/{topicId}:
 *   get:
 *     summary: Get topic contents by Topic ID
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic ID
 *     responses:
 *       200:
 *         description: Topic contents retrieved successfully
 *       404:
 *         description: No content found for this Topic ID
 */
router.get("/by-topic/:topicId", authenticateToken, topicContentController.getTopicContentByTopicId);

/**
 * @swagger
 * /api/v1/topic_content/by-teacher/{teacherId}:
 *   get:
 *     summary: Get topic contents by Teacher ID
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Topic contents retrieved successfully
 *       404:
 *         description: No content found for this teacher
 */
router.get("/by-teacher/:teacherId", authenticateToken, topicContentController.getTopicContentByTeacherId);

/**
 * @swagger
 * /api/v1/topic_content/update/{id}:
 *   put:
 *     summary: Update topic content by ID
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               isFree:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Topic content updated successfully
 *       400:
 *         description: Failed to update topic content
 *       403:
 *         description: Forbidden - can only update own content
 */
router.put("/update/:id", authenticateToken, topicContentController.updateTopicContent);

/**
 * @swagger
 * /api/v1/topic_content/delete/{id}:
 *   delete:
 *     summary: Delete topic content (soft delete)
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *     responses:
 *       200:
 *         description: Topic content moved to trash successfully
 *       403:
 *         description: Forbidden - can only delete own content
 *       500:
 *         description: Failed to move topic content to trash
 */
router.delete("/delete/:id", authenticateToken, topicContentController.deleteTopicContent);

/**
 * @swagger
 * /api/v1/topic_content/{contentId}/lesson/{lessonIndex}/comment:
 *   post:
 *     summary: Add comment to a lesson
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *       - in: path
 *         name: lessonIndex
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lesson index (0-based)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Failed to add comment
 */
router.post("/:contentId/lesson/:lessonIndex/comment", authenticateToken, topicContentController.addComment);

/**
 * @swagger
 * /api/v1/topic_content/{contentId}/lesson/{lessonIndex}/comment/{commentIndex}/reply:
 *   post:
 *     summary: Add reply to a comment
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *       - in: path
 *         name: lessonIndex
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lesson index (0-based)
 *       - in: path
 *         name: commentIndex
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment index (0-based)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reply added successfully
 *       400:
 *         description: Failed to add reply
 */
router.post("/:contentId/lesson/:lessonIndex/comment/:commentIndex/reply", authenticateToken, topicContentController.addReplyToComment);

/**
 * @swagger
 * /api/v1/topic_content/{contentId}/lesson/{lessonIndex}/reaction:
 *   post:
 *     summary: Add or update reaction
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *       - in: path
 *         name: lessonIndex
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lesson index (0-based)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emoji
 *             properties:
 *               emoji:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reaction added successfully
 *       400:
 *         description: Failed to add reaction
 */
router.post("/:contentId/lesson/:lessonIndex/reaction", authenticateToken, topicContentController.addReaction);

/**
 * @swagger
 * /api/v1/topic_content/{contentId}/lesson/{lessonIndex}/comments:
 *   get:
 *     summary: Get comments for a lesson
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *       - in: path
 *         name: lessonIndex
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lesson index (0-based)
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       400:
 *         description: Failed to retrieve comments
 */
router.get("/:contentId/lesson/:lessonIndex/comments", authenticateToken, topicContentController.getComments);

/**
 * @swagger
 * /api/v1/topic_content/{contentId}/lesson/{lessonIndex}/reactions:
 *   get:
 *     summary: Get reactions for a lesson
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *       - in: path
 *         name: lessonIndex
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lesson index (0-based)
 *     responses:
 *       200:
 *         description: Reactions retrieved successfully
 *       400:
 *         description: Failed to retrieve reactions
 */
router.get("/:contentId/lesson/:lessonIndex/reactions", authenticateToken, topicContentController.getReactions);

/**
 * @swagger
 * /api/v1/topic_content/trash/{id}:
 *   put:
 *     summary: Move topic content to trash
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *     responses:
 *       200:
 *         description: Topic content moved to trash successfully
 *       400:
 *         description: Failed to move topic content to trash
 */
router.put("/trash/:id", authenticateToken, topicContentController.moveToTrash);

/**
 * @swagger
 * /api/v1/topic_content/restore/{id}:
 *   put:
 *     summary: Restore topic content from trash
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *     responses:
 *       200:
 *         description: Topic content restored successfully
 *       400:
 *         description: Failed to restore topic content
 */
router.put("/restore/:id", authenticateToken, topicContentController.restoreFromTrash);

/**
 * @swagger
 * /api/v1/topic_content/trash/all:
 *   get:
 *     summary: Get all trashed items
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trashed contents retrieved successfully
 *       500:
 *         description: Failed to retrieve trashed contents
 */
router.get("/trash/all", authenticateToken, topicContentController.getTrashedContents);

/**
 * @swagger
 * /api/v1/topic_content/permanent-delete/{id}:
 *   delete:
 *     summary: Permanently delete topic content
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *     responses:
 *       200:
 *         description: Topic content permanently deleted successfully
 *       500:
 *         description: Failed to permanently delete topic content
 */
router.delete("/permanent-delete/:id", authenticateToken, topicContentController.deletePermanently);

/**
 * @swagger
 * /api/v1/topic_content/{contentId}/lesson/{lessonIndex}/comment/{commentIndex}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *       - in: path
 *         name: lessonIndex
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lesson index (0-based)
 *       - in: path
 *         name: commentIndex
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment index (0-based)
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       400:
 *         description: Failed to delete comment
 */
router.delete("/:contentId/lesson/:lessonIndex/comment/:commentIndex", authenticateToken, topicContentController.deleteComment);

/**
 * @swagger
 * /api/v1/topic_content/{contentId}/lesson/{lessonIndex}/reaction/{reactionIndex}:
 *   delete:
 *     summary: Delete a reaction
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *       - in: path
 *         name: lessonIndex
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lesson index (0-based)
 *       - in: path
 *         name: reactionIndex
 *         required: true
 *         schema:
 *           type: integer
 *         description: Reaction index (0-based)
 *     responses:
 *       200:
 *         description: Reaction deleted successfully
 *       400:
 *         description: Failed to delete reaction
 */
router.delete("/:contentId/lesson/:lessonIndex/reaction/:reactionIndex", authenticateToken, topicContentController.deleteReaction);

/**
 * @swagger
 * /api/v1/topic_content/lessonInfo/{contentId}/{lessonId}:
 *   get:
 *     summary: Get lesson info by ID
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *         description: Lesson ID
 *     responses:
 *       200:
 *         description: Lesson info retrieved successfully
 *       404:
 *         description: Lesson not found
 */
router.get("/lessonInfo/:contentId/:lessonId", authenticateToken, topicContentController.getLessonInfo);

/**
 * @swagger
 * /api/v1/topic_content/topic-contents/lean:
 *   get:
 *     summary: Get all topic contents with lean lessons
 *     tags: [Topic Content]
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/topic-contents/lean", topicContentController.getAllTopicContentsLeanLessons);

/**
 * @swagger
 * /api/v1/topic_content/topic-contents/topic/{topicId}/lean:
 *   get:
 *     summary: Get topic contents by topic ID with lean lessons
 *     tags: [Topic Content]
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic ID
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *       404:
 *         description: No content found
 *       500:
 *         description: Server error
 */
router.get("/topic-contents/topic/:topicId/lean", topicContentController.getTopicContentsByTopicIdLeanLessons);

/**
 * @swagger
 * /api/v1/topic_content/topic-contents/{id}/lean:
 *   get:
 *     summary: Get topic content by ID with lean lessons
 *     tags: [Topic Content]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Topic content not found
 */
router.get("/topic-contents/:id/lean", topicContentController.getTopicContentLeanLessonsById);

/**
 * @swagger
 * /api/v1/topic_content/topic-contents/{contentId}/lessons/{lessonId}:
 *   patch:
 *     summary: Update lesson content
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *         description: Lesson ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               audio:
 *                 type: string
 *               video:
 *                 type: string
 *               subHeading:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Lesson not found
 */
router.patch("/topic-contents/:contentId/lessons/:lessonId", authenticateToken, topicContentController.updateLessonContent);

/**
 * @swagger
 * /api/v1/topic_content/topic-contents/{id}/lessons/reorder:
 *   put:
 *     summary: Reorder lessons
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
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
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Lessons reordered successfully
 *       400:
 *         description: Failed to reorder lessons
 */
router.put("/topic-contents/:id/lessons/reorder", authenticateToken, topicContentController.reorderLessons);

/**
 * @swagger
 * /api/v1/topic_content/topic-contents/{id}/lessons:
 *   post:
 *     summary: Add lesson to topic content
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               subHeading:
 *                 type: array
 *                 items:
 *                   type: object
 *               audio:
 *                 type: string
 *               video:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lesson added successfully
 *       400:
 *         description: Failed to add lesson
 */
router.post("/topic-contents/:id/lessons", authenticateToken, topicContentController.addLessonInfo);

/**
 * @swagger
 * /api/v1/topic_content/topic-contents/{id}/lessons/{lessonId}:
 *   delete:
 *     summary: Delete lesson from topic content
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *         description: Lesson ID
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *       400:
 *         description: Failed to delete lesson
 */
router.delete("/topic-contents/:id/lessons/:lessonId", authenticateToken, topicContentController.deleteLessonInfo);

/**
 * @swagger
 * /api/v1/topic_content/{id}/purchase:
 *   post:
 *     summary: Record content purchase
 *     tags: [Topic Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 0
 *     responses:
 *       200:
 *         description: Purchase recorded successfully
 *       400:
 *         description: Failed to record purchase
 */
router.post("/:id/purchase", authenticateToken, topicContentController.incrementPurchaseCount);

module.exports = router;
