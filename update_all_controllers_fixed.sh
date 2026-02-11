#!/bin/bash
echo "Updating all controllers to use service methods..."

for controller in controllers/*.js; do
  base=$(basename "$controller" _controller.js)
  service="services/${base}_service.js"
  
  echo "--- $base ---"
  
  if [ ! -f "$service" ]; then
    echo "  ⚠ No service file found"
    continue
  fi
  
  # Check if controller already has proper methods
  if grep -q "exports.getAll" "$controller" && grep -q "exports.create" "$controller"; then
    echo "  ✓ Already has proper methods"
    
    # Still check for common issues
    if grep -q "adminService\.loginAdmin" "$controller"; then
      echo "  Fixing loginAdmin reference..."
      sed -i 's/adminService\.loginAdmin/adminService.login/g' "$controller"
    fi
    continue
  fi
  
  # Create/update controller
  cat > "$controller" << CONTROLLER_EOF
const ${base}Service = require("../services/${base}_service.js");

// Basic CRUD functions
exports.getAll = async (req, res) => {
  try {
    const data = await ${base}Service.getAll();
    res.status(200).json({
      success: true,
      message: "${base^} records retrieved successfully",
      count: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve ${base} records",
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await ${base}Service.getById(req.params.id);
    res.status(200).json({
      success: true,
      message: "${base^} retrieved successfully",
      data: data
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "${base^} not found",
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await ${base}Service.create(req.body);
    res.status(201).json({
      success: true,
      message: "${base^} created successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create ${base}",
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await ${base}Service.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "${base^} updated successfully",
      data: data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update ${base}",
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await ${base}Service.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: result.message || "${base^} deleted successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete ${base}",
      error: error.message
    });
  }
};
CONTROLLER_EOF

  # Add login for auth controllers
  if [[ "$base" =~ ^(admin|student|teacher)$ ]]; then
    cat >> "$controller" << LOGIN_EOF

// Login function
exports.login = async (req, res) => {
  try {
    const result = await ${base}Service.login(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Login failed",
      error: error.message
    });
  }
};

// Aliases for compatibility
exports.login${base^} = exports.login;
exports.getAll${base^}s = exports.getAll;
exports.get${base^}ById = exports.getById;
exports.create${base^} = exports.create;
exports.update${base^} = exports.update;
exports.delete${base^} = exports.delete;
LOGIN_EOF
    echo "  ✓ Added login and alias methods"
  fi

  echo "  ✓ Updated ${base}_controller.js"
done

echo ""
echo "=== CONTROLLER UPDATE COMPLETE ==="
