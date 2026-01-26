#!/bin/bash

echo "Adding missing GET endpoints..."

# Function to add basic GET endpoint
add_basic_get() {
    local file=$1
    local tag=$2
    local path_name=$3
    
    echo "Adding GET / to $file for $tag..."
    
    # Check if file has any proper @swagger endpoints
    if ! grep -q "@swagger" "$file" || grep -q "@swagger:" "$file"; then
        # Add a simple GET endpoint at the beginning
        sed -i "/^router\./i\\
/**\\
 * @swagger\\
 * /api/v1/$path_name:\\ 
 *   get:\\
 *     summary: Get all $tag items\\
 *     tags: [$tag]\\
 *     security:\\
 *       - bearerAuth: []\\
 *     responses:\\
 *       200:\\
 *         description: List of $tag items\\
 *         content:\\
 *           application/json:\\
 *             schema:\\
 *               type: object\\
 *               properties:\\
 *                 success:\\
 *                   type: boolean\\
 *                 message:\\
 *                   type: string\\
 *                 data:\\
 *                   type: array\\
 *                   items:\\
 *                     type: object\\
 */" "$file"
    fi
}

# Add to routers that need basic endpoints
add_basic_get "routers/wallet_router.js" "Wallet" "wallet"
add_basic_get "routers/admin_student_chat_router.js" "Chat" "admin_student_chat"
add_basic_get "routers/community_router.js" "Community" "community_service"

echo "✅ Added missing GET endpoints"
