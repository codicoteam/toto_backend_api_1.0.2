#!/bin/bash

echo "í´„ Creating all missing routers..."

# List of routers that exist
existing_routers=$(ls routers/*.js 2>/dev/null | sed 's|routers/||; s|\.js||')

# List of all routers needed (from controllers)
needed_routers=$(ls controllers/*.js 2>/dev/null | sed 's|controllers/||; s|\.js||' | grep -v temp_)

echo "Existing routers:"
echo "$existing_routers"
echo ""
echo "Needed routers (from controllers):"
echo "$needed_routers"
echo ""

# Function to check controller functions
get_controller_functions() {
    local controller=$1
    # Try to extract function names from controller
    if [ -f "controllers/${controller}.js" ]; then
        # Look for export patterns
        grep -E "exports\.[a-zA-Z_]+ =" "controllers/${controller}.js" | \
        sed 's/exports\.//; s/ =.*//' | head -10
    else
        echo ""
    fi
}

# Create missing routers
for controller in $needed_routers; do
    router_name="${controller%_controller}_router"
    router_file="routers/${router_name}.js"
    
    # Skip if router already exists
    if [ -f "$router_file" ]; then
        echo "âœ… $router_name.js already exists"
        continue
    fi
    
    echo "Creating $router_name.js..."
    
    # Get controller functions
    functions=$(get_controller_functions "$controller")
    
    # Check if it's a simple CRUD controller
    if echo "$functions" | grep -q "getAll" && \
       echo "$functions" | grep -q "getById" && \
       echo "$functions" | grep -q "create" && \
       echo "$functions" | grep -q "update" && \
       echo "$functions" | grep -q "delete"; then
        # Simple CRUD pattern
        base_name="${controller%_controller}"
        
        cat > "$router_file" << SIMPLE_ROUTER
const express = require("express");
const router = express.Router();
const ${base_name}Controller = require("../controllers/${controller}");
const { authenticateToken } = require("../middlewares/auth");

// Basic CRUD routes
router.get("/", authenticateToken, ${base_name}Controller.getAll);
router.get("/:id", authenticateToken, ${base_name}Controller.getById);
router.post("/", authenticateToken, ${base_name}Controller.create);
router.put("/:id", authenticateToken, ${base_name}Controller.update);
router.delete("/:id", authenticateToken, ${base_name}Controller.delete);

module.exports = router;
SIMPLE_ROUTER
        echo "  âœ… Created simple CRUD router"
        
    else
        # Complex controller - create basic routes
        base_name="${controller%_controller}"
        
        cat > "$router_file" << COMPLEX_ROUTER
const express = require("express");
const router = express.Router();
const ${base_name}Controller = require("../controllers/${controller}");
const { authenticateToken } = require("../middlewares/auth");

// Basic routes (customize based on actual controller functions)
router.get("/", authenticateToken, ${base_name}Controller.getAll || ${base_name}Controller.getAll${base_name^}s);
router.get("/:id", authenticateToken, ${base_name}Controller.getById || ${base_name}Controller.get${base_name^}ById);
router.post("/", authenticateToken, ${base_name}Controller.create || ${base_name}Controller.create${base_name^});
router.put("/:id", authenticateToken, ${base_name}Controller.update || ${base_name}Controller.update${base_name^});
router.delete("/:id", authenticateToken, ${base_name}Controller.delete || ${base_name}Controller.delete${base_name^});

module.exports = router;
COMPLEX_ROUTER
        echo "  âœ… Created complex router (needs customization)"
    fi
done

echo ""
echo "í¾‰ All missing routers created!"
echo "Note: Some routers may need customization based on actual controller functions."
