const express = require("express");
const router = express.Router();

// Check if controller exists
try {
  const topicController = require("../controllers/topic_controller.js");
  
  // Only add routes for methods that exist
  if (typeof topicController.getAll === 'function') {
    router.get("/", topicController.getAll);
  }
  if (typeof topicController.getById === 'function') {
    router.get("/:id", topicController.getById);
  }
  if (typeof topicController.create === 'function') {
    router.post("/", topicController.create);
  }
  
  console.log("Topic router loaded successfully");
} catch (error) {
  console.log("Topic controller not available, using placeholder routes");
  router.get("/", (req, res) => {
    res.json({ message: "Topic API - controller not available" });
  });
}

module.exports = router;
