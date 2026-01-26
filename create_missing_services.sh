#!/bin/bash

echo "Creating missing service files..."

services_needed=(
  "chat_service.js"
  "commentContent_service.js"
  "commentTopicContent_service.js"
  "community_service.js"
  "contentSystem_service.js"
  "dashboard_services.js"
  "endLessonQuestion_service.js"
  "homeBanner_service.js"
  "messageCommunity_services.js"
  "payment_service.js"
  "recordExam_service.js"
  "studentTopicProgress_service.js"
  "topicInSubject_service.js"
)

for service in "${services_needed[@]}"; do
  service_path="services/$service"
  service_name=$(echo "$service" | sed 's/\.js$//')
  
  if [ ! -f "$service_path" ]; then
    echo "Creating $service_path..."
    
    cat > "$service_path" << SERVICE_TEMPLATE
// $service_name Service
exports.getAll = async () => {
  console.log("getAll $service_name called");
  return [];
};

exports.getById = async (id) => {
  console.log("getById $service_name called for:", id);
  return { id };
};

exports.create = async (data) => {
  console.log("create $service_name called with:", data);
  return { id: Date.now(), ...data };
};

exports.update = async (id, data) => {
  console.log("update $service_name called for:", id, "with:", data);
  return { id, ...data };
};

exports.delete = async (id) => {
  console.log("delete $service_name called for:", id);
  return true;
};
SERVICE_TEMPLATE
    
    echo "  ✅ Created $service_path"
  else
    echo "  ✅ $service_path already exists"
  fi
done

echo "✅ All service files checked/created"
