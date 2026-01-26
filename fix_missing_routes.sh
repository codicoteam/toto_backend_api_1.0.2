#!/bin/bash

echo "=== FIXING MISSING ROUTES ==="
echo ""

# List of problematic controllers
problematic_controllers=(
  "comment_content"
  "comment_topic_content"
  "community"
  "content_system"
  "dashboard"
  "end_lesson_question"
  "message_community"
  "payment"
  "record_exam"
  "student_topic_progress"
  "subject"
  "wallet"
)

for controller in "${problematic_controllers[@]}"; do
  controller_file="controllers/${controller}_controller.js"
  router_file="routers/${controller}_router.js"
  
  echo "í´§ Fixing: $controller"
  
  if [ ! -f "$controller_file" ]; then
    echo "   âŒ Controller not found"
    continue
  fi
  
  if [ ! -f "$router_file" ]; then
    echo "   âš ï¸  Router not found, creating basic router..."
    cat > "$router_file" << TEMPLATE
const express = require("express");
const router = express.Router();
const controller = require("../controllers/${controller}_controller");
const { authenticateToken } = require("../middlewares/auth");
TEMPLATE
  fi
  
  # Get controller functions
  functions=$(grep -o "exports\.\w*\s*=" "$controller_file" | sed 's/exports\.//' | sed 's/\s*=//')
  
  # Check which functions are missing from router
  for func in $functions; do
    if ! grep -q "controller\.$func" "$router_file"; then
      echo "   âž• Adding route for: $func"
      
      # Determine HTTP method and route path
      if [[ $func =~ ^getAll|^getAll|^list|^index ]]; then
        echo "router.get(\"/\", authenticateToken, controller.$func);" >> "$router_file"
      elif [[ $func =~ Id$|ById$ ]]; then
        echo "router.get(\"/:id\", authenticateToken, controller.$func);" >> "$router_file"
      elif [[ $func =~ ^create|^create|^store|^add ]]; then
        echo "router.post(\"/\", authenticateToken, controller.$func);" >> "$router_file"
      elif [[ $func =~ ^update|^update|^edit|^modify ]]; then
        echo "router.put(\"/:id\", authenticateToken, controller.$func);" >> "$router_file"
      elif [[ $func =~ ^delete|^delete|^remove|^destroy ]]; then
        echo "router.delete(\"/:id\", authenticateToken, controller.$func);" >> "$router_file"
      else
        # Custom function
        if [[ $func =~ ^get ]]; then
          echo "router.get(\"/$func\", authenticateToken, controller.$func);" >> "$router_file"
        else
          echo "router.post(\"/$func\", authenticateToken, controller.$func);" >> "$router_file"
        fi
      fi
    fi
  done
  
  # Add module.exports if not present
  if ! grep -q "module.exports" "$router_file"; then
    echo "" >> "$router_file"
    echo "module.exports = router;" >> "$router_file"
  fi
  
  echo "   âœ… Done"
  echo ""
done

echo "=== FIX COMPLETE ==="
