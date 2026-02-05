#!/bin/bash
echo "ROUTER ENDPOINT ANALYSIS"
echo "========================"

for router in routers/*.js; do
  base=$(basename "$router" _router.js)
  controller="controllers/${base}_controller.js"
  
  if [ -f "$controller" ]; then
    echo ""
    echo "=== $base ==="
    
    # Get controller methods
    controller_methods=$(grep -o "exports\.[a-zA-Z_]*" "$controller" | sed 's/exports\.//g' | sort)
    
    # Get router endpoints
    router_endpoints=$(grep -o "router\.[a-zA-Z]*(\"[^\"]*\"" "$router" | sed 's/router\.//g' | sort)
    
    # Map controller methods to likely endpoints
    echo "Controller methods:"
    echo "$controller_methods" | tr '\n' ' ' | fold -s -w 60
    echo ""
    
    echo "Router endpoints:"
    echo "$router_endpoints" | while read endpoint; do
      echo "  $endpoint"
    done
    
    # Find missing mappings
    echo ""
    echo "Missing endpoints (from controller methods):"
    for method in $controller_methods; do
      # Skip common non-route methods
      if [[ "$method" =~ ^(login|getAll|getById|create|update|delete|getBy|search|filter|count)$ ]]; then
        # Check if endpoint exists
        found=0
        case "$method" in
          login)
            grep -q "router.post.*login" "$router" && found=1 ;;
          getAll)
            grep -q "router.get.*/\")" "$router" && found=1 ;;
          getById)
            grep -q "router.get.*/:id" "$router" && found=1 ;;
          create)
            grep -q "router.post.*/\")" "$router" && found=1 ;;
          update)
            grep -q "router.put.*/:id" "$router" && found=1 ;;
          delete)
            grep -q "router.delete.*/:id" "$router" && found=1 ;;
        esac
        
        if [ $found -eq 0 ]; then
          echo "  ✗ $method"
        fi
      fi
    done
  else
    echo ""
    echo "=== $base ==="
    echo "⚠ No controller found: $controller"
  fi
done
