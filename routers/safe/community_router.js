const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community_controller");
const { authenticateToken } = require("../middlewares/auth");

// Public endpoints (if they exist)
if (communityController.loginCommunity) router.post("/login", communityController.loginCommunity);
if (communityController.registerCommunity) router.post("/register", communityController.registerCommunity);

// Protected endpoints (if they exist)
if (communityController.getAllCommunitys) router.get("/", authenticateToken, communityController.getAllCommunitys);
if (communityController.getCommunityById) router.get("/:id", authenticateToken, communityController.getCommunityById);
if (communityController.createCommunity) router.post("/", authenticateToken, communityController.createCommunity);
if (communityController.updateCommunity) router.put("/:id", authenticateToken, communityController.updateCommunity);
if (communityController.deleteCommunity) router.delete("/:id", authenticateToken, communityController.deleteCommunity);

// Fallback for standard methods
if (!communityController.getAllCommunitys && communityController.getAll) router.get("/", authenticateToken, communityController.getAll);
if (!communityController.getCommunityById && communityController.getById) router.get("/:id", authenticateToken, communityController.getById);
if (!communityController.createCommunity && communityController.create) router.post("/", authenticateToken, communityController.create);
if (!communityController.updateCommunity && communityController.update) router.put("/:id", authenticateToken, communityController.update);
if (!communityController.deleteCommunity && communityController.delete) router.delete("/:id", authenticateToken, communityController.delete);

module.exports = router;
