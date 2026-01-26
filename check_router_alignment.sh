#!/bin/bash

echo "=== ROUTER-CONTROLLER ALIGNMENT CHECK ==="
echo ""

for controller in controllers/*_controller.js; do
  controller_name=$(basename "$controller" "_controller.js")
  router="routers/${controller_name}_router.js"
  
  echo "í´ Checking: $controller_name"
  
  if [ ! -f "$router" ]; then
    echo "   âŒ MISSING: Router not found"
    continue
  fi
  
  # Get controller functions
  controller_funcs=$(grep -o "exports\.\w*\s*=" "$controller" | sed 's/exports\.//' | sed 's/\s*=//' | sort -u)
  # Get router functions
  router_funcs=$(grep -o "${controller_name}Controller\.\w*" "$router" 2>/dev/null | sed "s/${controller_name}Controller\.//" | sort -u)
  
  # Find functions in controller not in router
  missing_in_router=$(comm -23 <(echo "$controller_funcs" | sort) <(echo "$router_funcs" | sort))
  
  if [ -n "$missing_in_router" ]; then
    echo "   âš ï¸  MISSING ROUTES FOR FUNCTIONS:"
    echo "$missing_in_router" | while read func; do
      echo "      - $func"
    done
  else
    echo "   âœ… All controller functions have routes"
  fi
  
  echo ""
done
