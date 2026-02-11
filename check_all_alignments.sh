#!/bin/bash
echo "ROUTER-CONTROLLER-SERVICE ALIGNMENT CHECK"
echo "========================================="

total_issues=0

for router in routers/*.js; do
  base=$(basename "$router" _router.js)
  controller="controllers/${base}_controller.js"
  service="services/${base}_service.js"
  
  echo ""
  echo "=== $base ==="
  
  # 1. Check controller exists
  if [ ! -f "$controller" ]; then
    echo "❌ CRITICAL: No controller found: $controller"
    total_issues=$((total_issues + 1))
    continue
  fi
  
  echo "✓ Controller exists"
  
  # 2. Check service exists (if referenced in controller)
  if grep -q "require.*${base}_service" "$controller"; then
    if [ ! -f "$service" ]; then
      echo "❌ CRITICAL: Controller references service but file not found: $service"
      total_issues=$((total_issues + 1))
    else
      echo "✓ Service exists"
    fi
  fi
  
  # 3. Check router imports controller
  if ! grep -q "require.*${base}_controller" "$router"; then
    echo "❌ Router doesn't import controller correctly"
    total_issues=$((total_issues + 1))
  else
    echo "✓ Router imports controller"
  fi
  
  # 4. Check method alignments
  echo "Checking method calls in router:"
  
  # Get controller variable name
  controller_var=$(grep "const.*Controller = require" "$router" | head -1 | sed 's/const //; s/ = require.*//')
  
  if [ -z "$controller_var" ]; then
    echo "  ⚠ Can't find controller variable name"
    continue
  fi
  
  # Check each Controller.method call
  method_issues=0
  grep -n "${controller_var}\.[a-zA-Z_]*" "$router" | while read line; do
    line_num=$(echo "$line" | cut -d: -f1)
    method_call=$(echo "$line" | grep -o "${controller_var}\.[a-zA-Z_]*" | head -1)
    method_name=$(echo "$method_call" | cut -d'.' -f2)
    
    # Check if method exists in controller
    if grep -q "exports.$method_name" "$controller"; then
      echo "  ✓ Line $line_num: $method_name exists in controller"
    else
      echo "  ❌ Line $line_num: $method_name NOT FOUND in controller!"
      method_issues=$((method_issues + 1))
      
      # Find similar method
      similar=$(grep -o "exports\.[a-zA-Z_]*" "$controller" | sed 's/exports\.//g' | grep -i "$method_name" | head -1)
      if [ -n "$similar" ]; then
        echo "      Suggestion: Change to $similar"
      fi
    fi
  done
  
  # 5. Check controller-service alignment
  if [ -f "$service" ]; then
    echo "Checking controller-service alignment:"
    
    # Get service variable name from controller
    service_var=$(grep "const.*Service = require" "$controller" | head -1 | sed 's/const //; s/ = require.*//')
    
    if [ -n "$service_var" ]; then
      # Check each Service.method call in controller
      grep -n "${service_var}\.[a-zA-Z_]*" "$controller" | while read line; do
        line_num=$(echo "$line" | cut -d: -f1)
        method_call=$(echo "$line" | grep -o "${service_var}\.[a-zA-Z_]*" | head -1)
        method_name=$(echo "$method_call" | cut -d'.' -f2)
        
        # Check if method exists in service
        if grep -q "exports.$method_name" "$service"; then
          echo "  ✓ Controller line $line_num: $service_var.$method_name exists in service"
        else
          echo "  ❌ Controller line $line_num: $service_var.$method_name NOT FOUND in service!"
          method_issues=$((method_issues + 1))
        fi
      done
    fi
  fi
  
  total_issues=$((total_issues + method_issues))
  
  if [ $method_issues -eq 0 ]; then
    echo "✓ All method alignments OK"
  fi
done

echo ""
echo "=== SUMMARY ==="
echo "Total alignment issues found: $total_issues"
if [ $total_issues -eq 0 ]; then
  echo "✅ PERFECT! All routers, controllers, and services are aligned."
else
  echo "⚠ Found $total_issues alignment issues that need fixing."
fi
