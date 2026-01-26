#!/bin/bash

echo "Testing key routers for Swagger compatibility..."

# List of key routers that should work
key_routers=(
  "subject_router.js"
  "admin_router.js"
  "student_router.js"
  "teacher_router.js"
  "exam_router.js"
  "library_book_router.js"
)

working_routers=()

for router in "${key_routers[@]}"; do
    if [ -f "routers/$router" ]; then
        echo -n "Testing $router... "
        
        # Simple test - check for basic Swagger structure
        if grep -q "@swagger" "routers/$router" && \
           grep -q "router\." "routers/$router" && \
           ! grep -q "description:.*:.*:" "routers/$router"; then
            echo "✅"
            working_routers+=("\"./routers/$router\"")
        else
            echo "⚠️"
        fi
    fi
done

echo ""
echo "Working routers: ${#working_routers[@]}"
echo "List: ${working_routers[@]}"
