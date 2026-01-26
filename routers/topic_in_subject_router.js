const express = require("express");
const router = express.Router();
const topic_in_subjectController = require("../controllers/topic_in_subject_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: TopicInSubject
 *   description: TopicInSubject management endpoints
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
 * /api/v1/topic-in-subject/:
 *   get:
 *     tags: [TopicInSubject]
 *     summary: Get all TopicInSubject records
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

router.get("/", authenticateToken, topic_in_subjectController.getAll);

/**
 * @swagger
 * /api/v1/topic-in-subject/{id}:
 *   get:
 *     tags: [TopicInSubject]
 *     summary: Get TopicInSubject by ID
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

router.get("/:id", authenticateToken, topic_in_subjectController.getById);

/**
 * @swagger
 * /api/v1/topic-in-subject/:
 *   post:
 *     tags: [TopicInSubject]
 *     summary: Create new TopicInSubject
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

router.post("/", authenticateToken, topic_in_subjectController.create);

/**
 * @swagger
 * /api/v1/topic-in-subject/{id}:
 *   put:
 *     tags: [TopicInSubject]
 *     summary: Update TopicInSubject
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

router.put("/:id", authenticateToken, topic_in_subjectController.update);

/**
 * @swagger
 * /api/v1/topic-in-subject/{id}:
 *   delete:
 *     tags: [TopicInSubject]
 *     summary: Delete TopicInSubject
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

router.delete("/:id", authenticateToken, topic_in_subjectController.delete);

module.exports = router;
