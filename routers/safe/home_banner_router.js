const express = require("express");
const router = express.Router();
const home_bannerController = require("../controllers/home_banner_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (home_bannerController.loginHome_banner) router.post("/login", home_bannerController.loginHome_banner);
if (home_bannerController.registerHome_banner) router.post("/register", home_bannerController.registerHome_banner);

// Protected endpoints (if they exist)
if (home_bannerController.getAllHome_banners) router.get("/", authenticateToken, home_bannerController.getAllHome_banners);
if (home_bannerController.getHome_bannerById) router.get("/:id", authenticateToken, home_bannerController.getHome_bannerById);
if (home_bannerController.createHome_banner) router.post("/", authenticateToken, home_bannerController.createHome_banner);
if (home_bannerController.updateHome_banner) router.put("/:id", authenticateToken, home_bannerController.updateHome_banner);
if (home_bannerController.deleteHome_banner) router.delete("/:id", authenticateToken, home_bannerController.deleteHome_banner);

// Fallback for standard methods
if (!home_bannerController.getAllHome_banners && home_bannerController.getAll) router.get("/", authenticateToken, home_bannerController.getAll);
if (!home_bannerController.getHome_bannerById && home_bannerController.getById) router.get("/:id", authenticateToken, home_bannerController.getById);
if (!home_bannerController.createHome_banner && home_bannerController.create) router.post("/", authenticateToken, home_bannerController.create);
if (!home_bannerController.updateHome_banner && home_bannerController.update) router.put("/:id", authenticateToken, home_bannerController.update);
if (!home_bannerController.deleteHome_banner && home_bannerController.delete) router.delete("/:id", authenticateToken, home_bannerController.delete);

module.exports = router;
