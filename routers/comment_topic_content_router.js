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
 * /api/v1/comment_topic_content/create:
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
 *               - student_id
 *               - topic_content_id
 *               - comment_on_content
 *             properties:
 *               student_id:
 *                 type: string
 *               topic_content_id:
 *                 type: string
 *               comment_on_content:
 *                 type: string
 *               showComment:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Comment created
 */
router.post("/create", authenticateToken, commentController.createComment);

/**
 * @swagger
 * /api/v1/comment_topic_content/getall:
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
 * /api/v1/comment_topic_content/bytopic/{topicContentId}:
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
 *     responses:
 *       200:
 *         description: Comments for topic
 */
router.get("/bytopic/:topicContentId", authenticateToken, commentController.getCommentsByTopicContentId);

/**
 * @swagger
 * /api/v1/comment_topic_content/update/{id}:
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Comment updated
 */
router.put("/update/:id", authenticateToken, commentController.updateComment);

/**
 * @swagger
 * /api/v1/comment_topic_content/delete/{id}:
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
 *     responses:
 *       200:
 *         description: Comment deleted
 */
router.delete("/delete/:id", authenticateToken, commentController.deleteComment);

/**
 * @swagger
 * /api/v1/comment_topic_content/delete/bytopic/{topicContentId}:
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
 *     responses:
 *       200:
 *         description: Comments deleted
 */
router.delete("/delete/bytopic/:topicContentId", authenticateToken, commentController.deleteCommentsByTopicContentId);

module.exports = router;
