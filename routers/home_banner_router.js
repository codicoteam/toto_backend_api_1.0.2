const express = require("express");
const router = express.Router();
const home_bannerController = require("../controllers/home_banner_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Home_banner
 *   description: Home_banner management
 */

/**
 * @swagger
 * /api/v1/home_banner:
 *   get:
 *     tags: [Home_banner]
 *     summary: Get all home_banner records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", authenticateToken, home_bannerController.getAll);

/**
 * @swagger
 * /api/v1/home_banner/{id}:
 *   get:
 *     tags: [Home_banner]
 *     summary: Get home_banner by ID
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
 */
router.get("/:id", authenticateToken, home_bannerController.getById);

/**
 * @swagger
 * /api/v1/home_banner:
 *   post:
 *     tags: [Home_banner]
 *     summary: Create new home_banner
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
 *         description: Created successfully
 */
router.post("/", authenticateToken, home_bannerController.create);

/**
 * @swagger
 * /api/v1/home_banner/{id}:
 *   put:
 *     tags: [Home_banner]
 *     summary: Update home_banner
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
 *         description: Updated successfully
 */
router.put("/:id", authenticateToken, home_bannerController.update);

/**
 * @swagger
 * /api/v1/home_banner/{id}:
 *   delete:
 *     tags: [Home_banner]
 *     summary: Delete home_banner
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
 *         description: Deleted successfully
 */
router.delete("/:id", authenticateToken, home_bannerController.delete);

module.exports = router;
