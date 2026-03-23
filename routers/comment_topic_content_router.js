const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment_topic_content_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: CommentTopicContent
 *   description: Comments on topic content
 */

/**
 * @swagger
 * /api/v1/comment-topic-content/create:
 *   post:
 *     tags: [CommentTopicContent]
 *     summary: Create comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - userType
 *               - topicId
 *               - content
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *                 description: ID of the user creating the comment
 *               userType:
 *                 type: string
 *                 enum: [student, teacher, admin]
 *                 example: "student"
 *                 description: Type of user
 *               topicId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c86"
 *                 description: ID of the topic content being commented on
 *               content:
 *                 type: string
 *                 example: "This is a great explanation!"
 *                 description: Comment text
 *               parentCommentId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c87"
 *                 description: ID of parent comment (for replies, optional)
 *     responses:
 *       201:
 *         description: Comment created
 */
router.post("/create", authenticateToken, commentController.createComment);

/**
 * @swagger
 * /api/v1/comment-topic-content/getall:
 *   get:
 *     tags: [CommentTopicContent]
 *     summary: Get all comments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get("/getall", authenticateToken, commentController.getAllComments);

/**
 * @swagger
 * /api/v1/comment-topic-content/bytopic/{topicContentId}:
 *   get:
 *     tags: [CommentTopicContent]
 *     summary: Get comments by topic content ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: topicContentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *     responses:
 *       200:
 *         description: Comments for topic
 */
router.get("/bytopic/:topicContentId", authenticateToken, commentController.getCommentsByTopicContentId);

/**
 * @swagger
 * /api/v1/comment-topic-content/update/{id}:
 *   put:
 *     tags: [CommentTopicContent]
 *     summary: Update comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Updated comment text"
 *     responses:
 *       200:
 *         description: Comment updated
 */
router.put("/update/:id", authenticateToken, commentController.updateComment);

/**
 * @swagger
 * /api/v1/comment-topic-content/delete/{id}:
 *   delete:
 *     tags: [CommentTopicContent]
 *     summary: Delete comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 */
router.delete("/delete/:id", authenticateToken, commentController.deleteComment);

/**
 * @swagger
 * /api/v1/comment-topic-content/delete/bytopic/{topicContentId}:
 *   delete:
 *     tags: [CommentTopicContent]
 *     summary: Delete all comments by topic content ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: topicContentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic content ID
 *     responses:
 *       200:
 *         description: Comments deleted
 */
router.delete("/delete/bytopic/:topicContentId", authenticateToken, commentController.deleteCommentsByTopicContentId);

module.exports = router;
