const router = express.Router();
const express = require("express");
const homeBannerController = require("../controllers/homeBanner_controller");
const { authenticateToken } = require("../middlewares/auth");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/homeBanner_routes:
 *   get:
 *     summary: Get all homeBanner routes.js
 *     tags: [HomeBanner routes.js]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of homeBanner routes.js
 */

router.get("/", authenticateToken, homeBannerController.getAll);

router.get("/", authenticateToken, homeBannerController.getAll);
router.get("/:id", authenticateToken, homeBannerController.getById);
router.post("/", authenticateToken, homeBannerController.create);
router.put("/:id", authenticateToken, homeBannerController.update);
router.delete("/:id", authenticateToken, homeBannerController.delete);

module.exports = router;