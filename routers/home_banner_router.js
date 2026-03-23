const express = require("express");
const router = express.Router();
const home_bannerController = require("../controllers/home_banner_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: HomeBanner
 *   description: Home banner management
 */

/**
 * @swagger
 * /api/v1/home-banner:
 *   get:
 *     tags: [HomeBanner]
 *     summary: Get all home banner records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of home banners
 */
router.get("/", authenticateToken, home_bannerController.getAll);

/**
 * @swagger
 * /api/v1/home-banner/{id}:
 *   get:
 *     tags: [HomeBanner]
 *     summary: Get home banner by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner ID
 *     responses:
 *       200:
 *         description: Banner details
 */
router.get("/:id", authenticateToken, home_bannerController.getById);

/**
 * @swagger
 * /api/v1/home-banner:
 *   post:
 *     tags: [HomeBanner]
 *     summary: Create new home banner
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
 *                 example: "Summer Sale Banner"
 *                 description: Banner name (required)
 *               description:
 *                 type: string
 *                 example: "Get 50% off on all courses this summer"
 *                 description: Banner description
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/banner.jpg"
 *                 description: Banner image URL
 *               linkUrl:
 *                 type: string
 *                 example: "/courses/summer-sale"
 *                 description: Link URL when banner is clicked
 *               order:
 *                 type: number
 *                 example: 1
 *                 description: Display order
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 default: true
 *                 description: Whether the banner is active
 *     responses:
 *       201:
 *         description: Banner created successfully
 */
router.post("/", authenticateToken, home_bannerController.create);

/**
 * @swagger
 * /api/v1/home-banner/{id}:
 *   put:
 *     tags: [HomeBanner]
 *     summary: Update home banner
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               linkUrl:
 *                 type: string
 *               order:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Banner updated successfully
 */
router.put("/:id", authenticateToken, home_bannerController.update);

/**
 * @swagger
 * /api/v1/home-banner/{id}:
 *   delete:
 *     tags: [HomeBanner]
 *     summary: Delete home banner
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner ID
 *     responses:
 *       200:
 *         description: Banner deleted successfully
 */
router.delete("/:id", authenticateToken, home_bannerController.delete);

module.exports = router;
