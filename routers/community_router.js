const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Community
 *   description: Community management
 */

/**
 * @swagger
 * /api/v1/community_service/create:
 *   post:
 *     tags: [Community]
 *     summary: Create community
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - subject
 *             properties:
 *               name:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *               subject:
 *                 type: string
 *               Level:
 *                 type: string
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Community created
 */
router.post("/create", authenticateToken, communityController.createCommunity);

/**
 * @swagger
 * /api/v1/community_service/getall:
 *   get:
 *     tags: [Community]
 *     summary: Get all communities
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of communities
 */
router.get("/getall", authenticateToken, communityController.getAllCommunities);

/**
 * @swagger
 * /api/v1/community_service/get/{id}:
 *   get:
 *     tags: [Community]
 *     summary: Get community by ID
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
 *         description: Community details
 */
router.get("/get/:id", authenticateToken, communityController.getCommunityById);

/**
 * @swagger
 * /api/v1/community_service/update/{id}:
 *   put:
 *     tags: [Community]
 *     summary: Update community
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
 *         description: Community updated
 */
router.put("/update/:id", authenticateToken, communityController.updateCommunity);

/**
 * @swagger
 * /api/v1/community_service/delete/{id}:
 *   delete:
 *     tags: [Community]
 *     summary: Delete community
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
 *         description: Community deleted
 */
router.delete("/delete/:id", authenticateToken, communityController.deleteCommunity);

/**
 * @swagger
 * /api/v1/community_service/join/{communityId}:
 *   post:
 *     tags: [Community]
 *     summary: Join community
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
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
 *               - studentId
 *             properties:
 *               studentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Joined community
 */
router.post("/join/:communityId", authenticateToken, communityController.joinCommunity);

/**
 * @swagger
 * /api/v1/community_service/leave/{communityId}:
 *   post:
 *     tags: [Community]
 *     summary: Leave community
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
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
 *               - studentId
 *             properties:
 *               studentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Left community
 */
router.post("/leave/:communityId", authenticateToken, communityController.leaveCommunity);

/**
 * @swagger
 * /api/v1/community_service/subject/{subjectId}:
 *   get:
 *     tags: [Community]
 *     summary: Get communities by subject ID
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
 *         description: Communities for subject
 */
router.get("/subject/:subjectId", authenticateToken, communityController.getCommunitiesBySubjectId);

module.exports = router;
