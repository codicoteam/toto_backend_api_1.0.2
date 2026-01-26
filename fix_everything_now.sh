#!/bin/bash

echo "Ì∫Ä FIXING EVERYTHING..."

# Backup original files
echo "Creating backup..."
mkdir -p backup/controllers
cp controllers/*.js backup/controllers/

# List all controllers and fix their imports
echo ""
echo "Fixing controller imports:"

controllers=(
  "admin"
  "chat"
  "comment_content"
  "comment_topic_content"
  "community"
  "content_system"
  "dashboard"
  "end_lesson_question"
  "exam"
  "home_banner"
  "library_book"
  "message_community"
  "payment"
  "record_exam"
  "student"
  "student_topic_progress"
  "subject"
  "teacher"
  "teacher_student_chat"
  "topic_content"
  "topic"
  "topic_in_subject"
  "wallet"
)

for name in "${controllers[@]}"; do
  controller="controllers/${name}_controller.js"
  service_file="services/${name}_service.js"
  
  if [ -f "$controller" ]; then
    if [ -f "$service_file" ]; then
      # Fix import line (always first line)
      sed -i "1s|^.*$|const ${name}Service = require(\"../services/${name}_service.js\");|" "$controller"
      echo "  ‚úÖ $name: Fixed to import ${name}_service.js"
    else
      echo "  ‚ö†Ô∏è  $name: Service file not found ($service_file)"
    fi
  fi
done

echo ""
echo "Checking for temp controllers..."
# Also fix temp controllers
for controller in controllers/temp_*_controller.js; do
  if [ -f "$controller" ]; then
    name=$(basename "$controller" "_controller.js")
    service_file="services/${name}_service.js"
    
    if [ -f "$service_file" ]; then
      sed -i "1s|^.*$|const ${name}Service = require(\"../services/${name}_service.js\");|" "$controller"
      echo "  ‚úÖ $name: Fixed temp controller"
    fi
  fi
done

echo ""
echo "Ìæâ ALL CONTROLLERS FIXED!"
