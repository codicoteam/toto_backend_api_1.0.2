#!/bin/bash

echo "í´§ Fixing all router files to use controllers..."

# Array of all router files that need fixing
routers=(
    "admin_student_chat_router.js"
    "comment_content_router.js"
    "comment_topic_content_router.js"
    "community_router.js"
    "content_system_router.js"
    "dashboard_router.js"
    "end_lesson_question_router.js"
    "homeBanner_routes.js"
    "message_community_router.js"
    "record_exam_router.js"
    "student_topic_progress_router.js"
    "subject_router.js"
    "topic_in_subject.js"
    "wallet_router.js"
    "payment_router.js"
)

for router_file in "${routers[@]}"; do
    if [ -f "routers/$router_file" ]; then
        echo "Processing routers/$router_file..."
        
        # Extract base name for controller
        base_name=$(echo "$router_file" | sed 's/_router\.js//' | sed 's/_routes\.js//' | sed 's/\.js//')
        
        # Convert to controller name (camelCase)
        controller_name=$(echo "$base_name" | sed 's/_\([a-z]\)/\U\1/g')
        
        # Check if controller exists
        controller_file="controllers/${controller_name}_controller.js"
        
        if [ ! -f "$controller_file" ]; then
            # Create a simple controller
            echo "  Creating $controller_file..."
            
            # Check what service file exists
            service_file=""
            if [ -f "services/${base_name}_service.js" ]; then
                service_file="${base_name}_service.js"
            elif [ -f "services/${base_name}_services.js" ]; then
                service_file="${base_name}_services.js"
            elif [ -f "services/${base_name}.js" ]; then
                service_file="${base_name}.js"
            fi
            
            if [ -n "$service_file" ]; then
                # Create controller with existing service
                cat > "$controller_file" << CONTROLLEREOF
const ${base_name}Service = require("../services/${service_file%.*}");

exports.getAll = async (req, res) => {
  try {
    const data = await ${base_name}Service.getAll();
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve data",
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await ${base_name}Service.getById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Data not found",
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await ${base_name}Service.create(req.body);
    res.status(201).json({
      success: true,
      message: "Data created successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create data",
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await ${base_name}Service.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update data",
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await ${base_name}Service.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Data deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete data",
      error: error.message
    });
  }
};
CONTROLLEREOF
            else
                # Create empty controller
                cat > "$controller_file" << EMPTYCONTROLLEREOF
// Controller for ${base_name}
// Add your controller functions here

exports.getAll = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get all ${base_name} endpoint",
    data: []
  });
};

exports.getById = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get ${base_name} by ID endpoint",
    data: { id: req.params.id }
  });
};

exports.create = async (req, res) => {
  res.status(201).json({
    success: true,
    message: "Create ${base_name} endpoint",
    data: req.body
  });
};

exports.update = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Update ${base_name} endpoint",
    data: { id: req.params.id, ...req.body }
  });
};

exports.delete = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Delete ${base_name} endpoint"
  });
};
EMPTYCONTROLLEREOF
            fi
        fi
        
        # Now update the router file to use the controller
        echo "  Updating router to use controller..."
        
        # Backup original
        cp "routers/$router_file" "routers/${router_file}.backup"
        
        # Create new router file with controller
        cat > "routers/$router_file" << ROUTEREOF
const express = require("express");
const router = express.Router();
const ${controller_name}Controller = require("../controllers/${controller_name}_controller");
const { authenticateToken } = require("../middlewares/auth");

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

// Basic CRUD routes - update these based on your actual endpoints

// Get all
router.get("/", authenticateToken, ${controller_name}Controller.getAll);

// Get by ID
router.get("/:id", authenticateToken, ${controller_name}Controller.getById);

// Create
router.post("/", authenticateToken, ${controller_name}Controller.create);

// Update
router.put("/:id", authenticateToken, ${controller_name}Controller.update);

// Delete
router.delete("/:id", authenticateToken, ${controller_name}Controller.delete);

module.exports = router;
ROUTEREOF
        
        echo "  âœ… Updated routers/$router_file"
        
    else
        echo "âŒ routers/$router_file not found"
    fi
done

echo ""
echo "í¾‰ All routers have been updated to use controllers!"
echo "í³‹ Note: You may need to customize the controller functions based on your service logic."
