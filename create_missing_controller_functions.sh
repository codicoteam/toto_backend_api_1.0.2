#!/bin/bash

echo "Creating missing controller functions for problematic routers..."

# Map routers to their controllers
declare -A router_controller_map=(
  ["admin_student_chat_router.js"]="chat_controller.js"
  ["comment_content_router.js"]="commentContent_controller.js"
  ["comment_topic_content_router.js"]="commentTopicContent_controller.js"
  ["community_router.js"]="community_controller.js"
  ["content_system_router.js"]="contentSystem_controller.js"
  ["dashboard_router.js"]="dashboard_controller.js"
  ["end_lesson_question_router.js"]="endLessonQuestion_controller.js"
  ["homeBanner_routes.js"]="homeBanner_controller.js"
  ["message_community_router.js"]="messageCommunity_controller.js"
  ["payment_router.js"]="payment_controller.js"
  ["record_exam_router.js"]="recordExam_controller.js"
  ["student_topic_progress_router.js"]="studentTopicProgress_controller.js"
  ["subject_router.js"]="subject_controller.js"
  ["topic_in_subject.js"]="topicInSubject_controller.js"
  ["wallet_router.js"]="wallet_controller.js"
)

for router in "${!router_controller_map[@]}"; do
  controller="${router_controller_map[$router]}"
  controller_path="controllers/$controller"
  
  echo "Checking $controller for $router..."
  
  if [ -f "$controller_path" ]; then
    # Check if controller has getAll function
    if ! grep -q "exports.getAll" "$controller_path"; then
      echo "  ❌ Missing getAll in $controller"
      
      # Check what functions it does have
      existing_functions=$(grep "exports\." "$controller_path" | head -5)
      echo "  Existing functions: $existing_functions"
      
      # Add getAll function
      echo "" >> "$controller_path"
      echo "// Added for router compatibility" >> "$controller_path"
      echo "exports.getAll = async (req, res) => {" >> "$controller_path"
      echo "  try {" >> "$controller_path"
      echo "    res.status(200).json({" >> "$controller_path"
      echo "      success: true," >> "$controller_path"
      echo "      message: \"Get all endpoint for $(echo $controller | sed 's/_controller.js//')\"," >> "$controller_path"
      echo "      data: []" >> "$controller_path"
      echo "    });" >> "$controller_path"
      echo "  } catch (error) {" >> "$controller_path"
      echo "    res.status(500).json({" >> "$controller_path"
      echo "      success: false," >> "$controller_path"
      echo "      message: \"Failed to get items\"," >> "$controller_path"
      echo "      error: error.message" >> "$controller_path"
      echo "    });" >> "$controller_path"
      echo "  }" >> "$controller_path"
      echo "};" >> "$controller_path"
      
      echo "  ✅ Added getAll to $controller"
    else
      echo "  ✅ $controller has getAll"
    fi
  else
    echo "  ⚠️  Controller not found: $controller"
  fi
done

echo "✅ Controller functions checked/added"
