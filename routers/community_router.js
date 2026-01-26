const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community_controller");

/**
 * @swagger
 * tags:
 *   name: Community
 *   description: Community management endpoints
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

const { authenticateToken } = require("../middlewares/auth");

// Community routes based on actual controller functions

/**
 * @swagger
 * /api/v1/community:
 *   get:
 *     tags:
 *       - Community
 *     summary: Get all Community records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/", authenticateToken, communityController.getAllCommunities);
router.get("/user", authenticateToken, communityController.getUserCommunities);

/**
 * @swagger
 * /api/v1/community/{id}:
 *   get:
 *     tags:
 *       - Community
 *     summary: Get Community by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.get("/:id", authenticateToken, communityController.getCommunityById);

/**
 * @swagger
 * /api/v1/community:
 *   post:
 *     tags:
 *       - Community
 *     summary: Create new Community
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/", authenticateToken, communityController.createCommunity);

/**
 * @swagger
 * /api/v1/community/{id}:
 *   put:
 *     tags:
 *       - Community
 *     summary: Update Community
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *       404:
 *         description: Not found
 */
router.put("/:id", authenticateToken, communityController.updateCommunity);

/**
 * @swagger
 * /api/v1/community/{id}:
 *   delete:
 *     tags:
 *       - Community
 *     summary: Delete Community
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.delete("/:id", authenticateToken, communityController.deleteCommunity);

/**
 * @swagger
 * /api/v1/community:
 *   post:
 *     tags:
 *       - Community
 *     summary: Create new Community
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/:id/join", authenticateToken, communityController.joinCommunity);

/**
 * @swagger
 * /api/v1/community:
 *   post:
 *     tags:
 *       - Community
 *     summary: Create new Community
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/:id/leave", authenticateToken, communityController.leaveCommunity);

/**
 * @swagger
 * /api/v1/community:
 *   post:
 *     tags:
 *       - Community
 *     summary: Create new Community
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/:id/admin", authenticateToken, communityController.addAdmin);

/**
 * @swagger
 * /api/v1/community/{id}:
 *   delete:
 *     tags:
 *       - Community
 *     summary: Delete Community
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.delete("/:id/admin", authenticateToken, communityController.removeAdmin);

/**
 * @swagger
 * /api/v1/community:
 *   post:
 *     tags:
 *       - Community
 *     summary: Create new Community
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/:id/post", authenticateToken, communityController.createPost);

/**
 * @swagger
 * /api/v1/community:
 *   post:
 *     tags:
 *       - Community
 *     summary: Create new Community
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/:id/post/:postIndex/like", authenticateToken, communityController.likePost);

/**
 * @swagger
 * /api/v1/community:
 *   post:
 *     tags:
 *       - Community
 *     summary: Create new Community
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/:id/post/:postIndex/unlike", authenticateToken, communityController.unlikePost);

/**
 * @swagger
 * /api/v1/community:
 *   post:
 *     tags:
 *       - Community
 *     summary: Create new Community
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/:id/post/:postIndex/comment", authenticateToken, communityController.addComment);

/**
 * @swagger
 * /api/v1/community:
 *   post:
 *     tags:
 *       - Community
 *     summary: Create new Community
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/:id/post/:postIndex/comment/:commentIndex/reply", authenticateToken, communityController.addReplyToComment);

module.exports = router;
