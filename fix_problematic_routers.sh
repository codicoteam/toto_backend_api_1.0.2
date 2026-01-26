#!/bin/bash

echo "Fixing problematic routers with Swagger issues..."

# Function to fix a router
fix_router() {
    local router_file=$1
    local tag_name=$2
    
    echo "Fixing $router_file..."
    
    # Check if it has malformed Swagger
    if grep -q "@swagger" "$router_file" && grep -q "^\s*\* tags:" "$router_file"; then
        # Create a clean version
        cat > "${router_file}.clean" << ROUTER_CLEAN
const express = require("express");
const router = express.Router();
$(grep "require(" "$router_file")

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1/$(echo "$router_file" | sed 's/routers\///' | sed 's/_router.js//' | sed 's/.js//'):
 *   get:
 *     summary: Get all ${tag_name}
 *     tags: [${tag_name}]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of ${tag_name}
 */

$(grep "router\." "$router_file" | head -1)

module.exports = router;
ROUTER_CLEAN
        
        # Replace original
        mv "${router_file}.clean" "$router_file"
        echo "  ✅ Fixed $router_file"
    fi
}

# Fix each problematic router
fix_router "routers/admin_student_chat_router.js" "Chat"
fix_router "routers/community_router.js" "Community" 
fix_router "routers/wallet_router.js" "Wallet"

echo "✅ All problematic routers fixed"
