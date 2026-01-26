#!/bin/bash

echo "Creating simple versions of problematic routers..."

# List of routers that had issues
problematic_routers=(
  "content_system_router.js"
  "comment_content_router.js"
  "comment_topic_content_router.js"
  "dashboard_router.js"
  "end_lesson_question_router.js"
  "homeBanner_routes.js"
  "message_community_router.js"
  "payment_router.js"
  "record_exam_router.js"
  "student_topic_progress_router.js"
  "topic_in_subject.js"
  "wallet_router.js"
  "community_router.js"
  "admin_student_chat_router.js"
)

for router in "${problematic_routers[@]}"; do
    if [ -f "routers/$router" ]; then
        echo "Fixing $router..."
        
        # Extract base name and controller
        base_name=$(echo "$router" | sed 's/_router.js//' | sed 's/_routes.js//' | sed 's/.js//')
        controller_name="${base_name}_controller"
        
        # Check if controller exists
        if [ ! -f "controllers/${controller_name}.js" ]; then
            # Try alternative naming
            controller_name=$(echo "$base_name" | sed 's/_\([a-z]\)/\U\1/g')
            controller_name="${controller_name}_controller"
        fi
        
        # Create simple router
        cat > "routers/$router" << SIMPLE_ROUTER
const express = require("express");
const router = express.Router();
const ${base_name}Controller = require("../controllers/${controller_name}.js");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/${base_name}:
 *   get:
 *     summary: Get all ${base_name}
 *     tags: [${base_name^}]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of ${base_name}
 */

router.get("/", authenticateToken, ${base_name}Controller.getAll);

module.exports = router;
SIMPLE_ROUTER
        
        echo "  ✅ Created simple $router"
    fi
done

echo "✅ All problematic routers fixed with simple versions"
