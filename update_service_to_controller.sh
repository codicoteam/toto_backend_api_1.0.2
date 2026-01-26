#!/bin/bash

echo "í´„ Converting service calls to controller calls in routers..."

# List of routers that still use services
routers_with_services=(
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
)

# First, create quick controllers for missing ones
echo "í³ Creating missing controllers..."

# Create dashboard_controller.js
if [ ! -f "controllers/dashboard_controller.js" ]; then
    cat > controllers/dashboard_controller.js << 'DASHBOARDCONTROLLER'
const dashboardService = require("../services/dashboard_services");

exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.status(200).json({
      success: true,
      message: "Dashboard stats retrieved successfully",
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard stats",
      error: error.message
    });
  }
};
DASHBOARDCONTROLLER
fi

# Create home_banner_controller.js
if [ ! -f "controllers/home_banner_controller.js" ]; then
    cat > controllers/home_banner_controller.js << 'HOMEBANNERCONTROLLER'
const homeBannerService = require("../services/home_banner_service");

exports.createBanner = async (req, res) => {
  try {
    const banner = await homeBannerService.createBanner(req.body);
    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: banner
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create banner",
      error: error.message
    });
  }
};

exports.getAllBanners = async (req, res) => {
  try {
    const banners = await homeBannerService.getAllBanners();
    res.status(200).json({
      success: true,
      message: "Banners retrieved successfully",
      data: banners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve banners",
      error: error.message
    });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const banner = await homeBannerService.updateBanner(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: banner
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update banner",
      error: error.message
    });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    await homeBannerService.deleteBanner(req.params.id);
    res.status(200).json({
      success: true,
      message: "Banner deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete banner",
      error: error.message
    });
  }
};
HOMEBANNERCONTROLLER
fi

# Now update each router
for router in "${routers_with_services[@]}"; do
    if [ -f "routers/$router" ]; then
        echo "í³„ Processing $router..."
        
        # Extract base name
        base_name=$(echo "$router" | sed 's/_router\.js//' | sed 's/_routes\.js//' | sed 's/\.js//')
        
        # Convert to proper case for controller
        controller_name=$(echo "$base_name" | sed 's/_\([a-z]\)/\U\1/g')
        
        # Create controller filename
        controller_file="controllers/${controller_name}_controller.js"
        
        # Check if controller exists
        if [ ! -f "$controller_file" ]; then
            echo "   âš ï¸  Controller $controller_file not found. Creating basic one..."
            
            # Create basic controller
            cat > "$controller_file" << BASICCONTROLLER
const ${base_name}Service = require("../services/${base_name}_service");

// Basic CRUD operations
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
BASICCONTROLLER
        fi
        
        # Create updated router file
        echo "   í´§ Creating updated version of $router..."
        
        # Backup original
        cp "routers/$router" "routers/${router}.backup"
        
        # Create new router with controller pattern
        cat > "routers/$router" << NEWROUTER
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

// You need to manually update these routes to use the controller functions
// Example routes (uncomment and modify as needed):

/**
 * @swagger
 * /api/v1/${base_name}/:
 *   get:
 *     summary: Get all ${base_name}
 *     tags: [${controller_name^}]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *       401:
 *         description: Unauthorized
 */
// router.get("/", authenticateToken, ${controller_name}Controller.getAll);

/**
 * @swagger
 * /api/v1/${base_name}/{id}:
 *   get:
 *     summary: Get ${base_name} by ID
 *     tags: [${controller_name^}]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ${controller_name^} ID
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *       404:
 *         description: Data not found
 */
// router.get("/:id", authenticateToken, ${controller_name}Controller.getById);

/**
 * @swagger
 * /api/v1/${base_name}/create:
 *   post:
 *     summary: Create new ${base_name}
 *     tags: [${controller_name^}]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Data created successfully
 *       400:
 *         description: Failed to create data
 */
// router.post("/create", authenticateToken, ${controller_name}Controller.create);

module.exports = router;
NEWROUTER
        
        echo "   âœ… Updated $router to use controller pattern"
        echo "   í³‹ Original saved as routers/${router}.backup"
    else
        echo "   âŒ $router not found"
    fi
done

echo ""
echo "í¾‰ Update complete!"
echo ""
echo "í³‹ Next steps for each updated router:"
echo "1. Review the backup file: routers/*.backup"
echo "2. Copy the route definitions from backup to new file"
echo "3. Replace service calls with controller calls"
echo "4. Add proper Swagger annotations for each endpoint"
echo "5. Test the endpoints"
