#!/bin/bash

echo "Fixing duplicate tag definitions..."

# Files with duplicate tags
files_with_duplicates="routers/wallet_router.js routers/admin_student_chat_router.js routers/community_router.js"

for file in $files_with_duplicates; do
    echo "Fixing $file..."
    
    # Remove duplicate tags section
    sed -i '/tags:/{N;N;N;N;N;/tags:/d}' "$file"
    
    # Keep only one tags definition
    if grep -q "tags:" "$file"; then
        echo "  ✅ Fixed duplicate tags"
    else
        echo "  ⚠️  No tags found after fix"
    fi
done

echo "✅ Fixed duplicate tags in all files"
