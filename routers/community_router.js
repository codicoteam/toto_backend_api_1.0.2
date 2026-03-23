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
 * /api/v1/community/create:
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mathematics Study Group"
 *                 description: Community name (required)
 *               description:
 *                 type: string
 *                 example: "A group for math enthusiasts"
 *                 description: Community description
 *               createdBy:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c85"
 *                   userType:
 *                     type: string
 *                     enum: [student, teacher, admin]
 *                     example: "teacher"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 default: true
 *     responses:
 *       201:
 *         description: Community created
 */
router.post("/create", authenticateToken, communityController.createCommunity);

/**
 * @swagger
 * /api/v1/community/getall:
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
 * /api/v1/community/get/{id}:
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
 *         description: Community ID
 *     responses:
 *       200:
 *         description: Community details
 */
router.get("/get/:id", authenticateToken, communityController.getCommunityById);

/**
 * @swagger
 * /api/v1/community/update/{id}:
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
 *         description: Community ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Community Name"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Community updated
 */
router.put("/update/:id", authenticateToken, communityController.updateCommunity);

/**
 * @swagger
 * /api/v1/community/delete/{id}:
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
 *         description: Community ID
 *     responses:
 *       200:
 *         description: Community deleted
 */
router.delete("/delete/:id", authenticateToken, communityController.deleteCommunity);

/**
 * @swagger
 * /api/v1/community/join/{communityId}:
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
 *         description: Community ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - userType
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *               userType:
 *                 type: string
 *                 enum: [student, teacher, admin]
 *                 example: "student"
 *     responses:
 *       200:
 *         description: Joined community
 */
router.post("/join/:communityId", authenticateToken, communityController.joinCommunity);

/**
 * @swagger
 * /api/v1/community/leave/{communityId}:
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
 *         description: Community ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - userType
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *               userType:
 *                 type: string
 *                 enum: [student, teacher, admin]
 *                 example: "student"
 *     responses:
 *       200:
 *         description: Left community
 */
router.post("/leave/:communityId", authenticateToken, communityController.leaveCommunity);

/**
 * @swagger
 * /api/v1/community/subject/{subjectId}:
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
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Communities for subject
 */
router.get("/subject/:subjectId", authenticateToken, communityController.getCommunitiesBySubjectId);

module.exports = router;
