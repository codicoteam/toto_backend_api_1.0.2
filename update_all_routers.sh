#!/bin/bash

echo "í´„ Updating all router files to use controllers..."

# 1. First, create any missing controllers
echo "í³ Creating missing controllers..."

# Create community_controller.js if missing
if [ ! -f "controllers/community_controller.js" ]; then
    echo "Creating community_controller.js..."
    # We already created this earlier, so just make sure it exists
    touch controllers/community_controller.js
fi

# Create message_community_controller.js if missing
if [ ! -f "controllers/message_community_controller.js" ]; then
    cat > controllers/message_community_controller.js << 'MESSAGECONTROLLER'
const messageCommunityService = require("../services/message_community_services");

exports.createMessage = async (req, res) => {
  try {
    const message = await messageCommunityService.createMessage({
      ...req.body,
      userId: req.user.id,
      userType: req.user.type === 'teacher' ? 'Teacher' : 
                req.user.type === 'admin' ? 'Admin' : 'Student'
    });
    res.status(201).json({
      success: true,
      message: "Message created successfully",
      data: message
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create message",
      error: error.message
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await messageCommunityService.getMessages(req.params.communityId);
    res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve messages",
      error: error.message
    });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const message = await messageCommunityService.updateMessage(
      req.params.id,
      req.body,
      req.user.id,
      req.user.type
    );
    res.status(200).json({
      success: true,
      message: "Message updated successfully",
      data: message
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update message",
      error: error.message
    });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await messageCommunityService.deleteMessage(
      req.params.id,
      req.user.id,
      req.user.type
    );
    res.status(200).json({
      success: true,
      message: "Message deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete message",
      error: error.message
    });
  }
};
MESSAGECONTROLLER
fi

# 2. Update all router files
echo "í³„ Updating router files..."

# List of all router files in your project
routers=(
    "admin_router.js"
    "student_router.js"
    "teacher_router.js"
    "topic_content_router.js"
    "exam_router.js"
    "library_book_router.js"
    "wallet_router.js"
    "payment_router.js"
    "community_router.js"
    "message_community_router.js"
    "admin_student_chat_router.js"
    "subject_router.js"
    "topic_in_subject.js"
    "content_system_router.js"
    "comment_content_router.js"
    "comment_topic_content_router.js"
    "end_lesson_question_router.js"
    "record_exam_router.js"
    "dashboard_router.js"
    "student_topic_progress_router.js"
    "homeBanner_routes.js"
)

for router in "${routers[@]}"; do
    if [ -f "routers/$router" ]; then
        echo "Processing $router..."
        
        # Extract base name for controller
        controller_name=$(echo "$router" | sed 's/_router\.js//' | sed 's/_routes\.js//' | sed 's/\.js//')
        
        # Convert to camelCase for controller variable
        controller_var=$(echo "$controller_name" | sed 's/_\([a-z]\)/\U\1/g' | sed 's/^[a-z]/\U&/')
        
        # Create a simple controller-based version
        cat > "routers/temp_$router" << TEMPLATE
const express = require("express");
const router = express.Router();
const ${controller_name}Controller = require("../controllers/${controller_name}_controller");
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: ${controller_name^}
 *   description: ${controller_name} management endpoints
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

// Add your routes here using the controller
// Example: router.get("/", authenticateToken, ${controller_name}Controller.getAll);

module.exports = router;
TEMPLATE
        
        # Check if the original file already has routes
        if grep -q "router\." "routers/$router"; then
            echo "âš ï¸  $router already has routes. You'll need to manually update it to use controllers."
        else
            mv "routers/temp_$router" "routers/$router"
            echo "âœ… Updated $router to use controller pattern"
        fi
    else
        echo "âŒ $router not found"
    fi
done

echo "í¾‰ Router update process completed!"
echo ""
echo "í³‹ Next steps:"
echo "1. For each router file, manually replace direct service calls with controller calls"
echo "2. Add detailed Swagger annotations for each endpoint"
echo "3. Make sure corresponding controllers exist"
echo "4. Test all endpoints"
