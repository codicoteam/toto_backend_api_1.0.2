#!/bin/bash

echo "Checking and fixing router route definitions..."

# List of routers that might be missing actual routes
routers_to_check="routers/admin_router.js routers/student_router.js routers/teacher_router.js routers/exam_router.js routers/library_book_router.js"

for router in $routers_to_check; do
    echo -e "\nChecking $(basename $router):"
    
    # Count actual route definitions (router.get, router.post, etc.)
    route_count=$(grep -c "router\.[a-zA-Z]*(" "$router")
    echo "  Found $route_count route definitions"
    
    if [ "$route_count" -eq 0 ]; then
        echo "  ⚠️  No route definitions found!"
        
        # Get controller name
        controller_name=$(grep -o "require(\"\.\./controllers/[a-zA-Z_]*_controller")" "$router" | head -1 | sed 's/.*\///' | sed 's/_controller")//' | sed 's/")//')
        
        if [ ! -z "$controller_name" ]; then
            echo "  Controller: ${controller_name}_controller.js"
            
            # Check what functions the controller exports
            controller_file="controllers/${controller_name}_controller.js"
            if [ -f "$controller_file" ]; then
                echo "  Controller functions:"
                grep "exports\." "$controller_file" | head -5
                
                # Add a simple GET route
                echo "  Adding basic GET route..."
                
                # Find where to add it (before module.exports)
                if grep -q "module.exports" "$router"; then
                    sed -i '/module.exports/i\
router.get("/", authenticateToken, '"${controller_name}"'Controller.getAll);' "$router"
                    echo "  ✅ Added GET / route"
                fi
            fi
        fi
    fi
done

echo -e "\n✅ Router definitions checked"
