#!/bin/bash

echo "=== FIXING ALL SERVICE IMPORTS ==="
echo ""

# Map of common naming mismatches
declare -A name_fixes=(
  ["dashboard_services"]="dashboard_service"
  ["dashboardServices"]="dashboard_service"
  ["content_system_service"]="contentSystem_service"
  ["contentSystem_service"]="content_system_service"
  ["home_banner_service"]="homeBanner_service"
  ["homeBanner_service"]="home_banner_service"
  ["record_exam_service"]="recordExam_service"
  ["recordExam_service"]="record_exam_service"
  ["student_topic_progress_service"]="studentTopicProgress_service"
  ["studentTopicProgress_service"]="student_topic_progress_service"
  ["teacher_student_chat_service"]="teacherStudentChat_service"
  ["teacherStudentChat_service"]="teacher_student_chat_service"
  ["topic_in_subject_service"]="topicInSubject_service"
  ["topicInSubject_service"]="topic_in_subject_service"
)

for controller in controllers/*_controller.js; do
  name=$(basename "$controller" "_controller.js")
  echo "Processing: $name"
  
  # Get current import
  current_import=$(grep -o "require(\"\.\./services/[^\"]*")" "$controller" | head -1)
  
  if [ -z "$current_import" ]; then
    echo "  ℹ️  No service import found"
    continue
  fi
  
  # Extract imported filename
  imported=$(echo "$current_import" | sed "s|.*/services/||" | sed "s/['\")]//g")
  
  # Check if file exists
  if [ -f "services/$imported" ]; then
    echo "  ✅ Import correct: $imported"
  else
    echo "  ⚠️  Imported file doesn't exist: $imported"
    
    # Try to find the correct file
    possible_files=$(ls services/ 2>/dev/null | grep -i "$name")
    
    if [ -n "$possible_files" ]; then
      # Take the first match
      correct_file=$(echo "$possible_files" | head -1)
      echo "  ��� Found possible match: $correct_file"
      
      # Fix the import
      sed -i "s|require(\"\.\./services/${imported}\")|require(\"../services/${correct_file}\")|g" "$controller"
      echo "  ✅ Updated import to: $correct_file"
    else
      # Check our name fixes map
      if [ -n "${name_fixes[$imported]}" ]; then
        correct_file="${name_fixes[$imported]}"
        if [ -f "services/$correct_file" ]; then
          sed -i "s|require(\"\.\./services/${imported}\")|require(\"../services/${correct_file}\")|g" "$controller"
          echo "  ✅ Updated import to: $correct_file (from mapping)"
        else
          echo "  ❌ Mapped file also doesn't exist: $correct_file"
        fi
      else
        echo "  ❌ Could not find service file for $name"
      fi
    fi
  fi
done

echo ""
echo "=== CHECKING FOR MISSING SERVICES ==="

# Create any missing services
for controller in controllers/*_controller.js; do
  name=$(basename "$controller" "_controller.js")
  service_file="services/${name}_service.js"
  
  if [ ! -f "$service_file" ]; then
    echo "⚠️  Missing service: $service_file"
    
    # Check if there's any service with this name
    existing=$(ls services/ 2>/dev/null | grep -i "^${name}_" || ls services/ 2>/dev/null | grep -i "${name}")
    
    if [ -z "$existing" ]; then
      echo "  ⚠️  No service file found, creating basic one..."
      cat > "$service_file" << SERVICE
// Service for ${name}
const ${name}Model = require("../models/${name}_model");

exports.getAll = async () => {
  return await ${name}Model.find();
};

exports.getById = async (id) => {
  return await ${name}Model.findById(id);
};

exports.create = async (data) => {
  return await ${name}Model.create(data);
};

exports.update = async (id, data) => {
  return await ${name}Model.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await ${name}Model.findByIdAndDelete(id);
};
SERVICE
      echo "  ✅ Created basic service: $service_file"
    fi
  fi
done
