#!/bin/bash
echo "AUTO-FIXING ALL ALIGNMENT ISSUES"
echo "================================"

fixed_count=0

for router in routers/*.js; do
  base=$(basename "$router" _router.js)
  controller="controllers/${base}_controller.js"
  service="services/${base}_service.js"
  
  echo ""; echo "--- $base ---"
  
  # Skip if no controller
  if [ ! -f "$controller" ]; then
    echo "Skipping: No controller found"
    continue
  fi
  
  # 1. Fix controller variable name in router
  controller_var=$(grep "const.*Controller = require" "$router" | head -1 | sed 's/const //; s/ = require.*//')
  
  if [ -z "$controller_var" ]; then
    echo "⚠ No controller import found in router"
    continue
  fi
  
  # 2. Fix method mismatches in router
  grep -n "${controller_var}\.[a-zA-Z_]*" "$router" | while read line; do
    line_num=$(echo "$line" | cut -d: -f1)
    method_call=$(echo "$line" | grep -o "${controller_var}\.[a-zA-Z_]*" | head -1)
    method_name=$(echo "$method_call" | cut -d'.' -f2)
    
    # Check if method exists in controller
    if ! grep -q "exports.$method_name" "$controller"; then
      # Find similar method
      similar=$(grep -o "exports\.[a-zA-Z_]*" "$controller" | sed 's/exports\.//g' | grep -i "^${method_name}" | head -1)
      
      if [ -z "$similar" ]; then
        # Try reverse: controller has getAllAdmins, router calls getAll
        similar=$(grep -o "exports\.[a-zA-Z_]*" "$controller" | sed 's/exports\.//g' | grep -i "${method_name}$" | head -1)
      fi
      
      if [ -n "$similar" ] && [ "$similar" != "$method_name" ]; then
        echo "  Fixing line $line_num: $method_name → $similar"
        sed -i "${line_num}s/${controller_var}\.${method_name}/${controller_var}.${similar}/g" "$router"
        fixed_count=$((fixed_count + 1))
      fi
    fi
  done
  
  # 3. Fix service-controller alignment
  if [ -f "$service" ]; then
    service_var=$(grep "const.*Service = require" "$controller" | head -1 | sed 's/const //; s/ = require.*//')
    
    if [ -n "$service_var" ]; then
      grep -n "${service_var}\.[a-zA-Z_]*" "$controller" | while read line; do
        line_num=$(echo "$line" | cut -d: -f1)
        method_call=$(echo "$line" | grep -o "${service_var}\.[a-zA-Z_]*" | head -1)
        method_name=$(echo "$method_call" | cut -d'.' -f2)
        
        # Check if method exists in service
        if ! grep -q "exports.$method_name" "$service"; then
          # Find similar method in service
          similar=$(grep -o "exports\.[a-zA-Z_]*" "$service" | sed 's/exports\.//g' | grep -i "$method_name" | head -1)
          
          if [ -n "$similar" ] && [ "$similar" != "$method_name" ]; then
            echo "  Fixing controller line $line_num: $service_var.$method_name → $service_var.$similar"
            sed -i "${line_num}s/${service_var}\.${method_name}/${service_var}.${similar}/g" "$controller"
            fixed_count=$((fixed_count + 1))
          fi
        fi
      done
    fi
  fi
done

echo ""; echo "=== FIX SUMMARY ==="
echo "Total fixes applied: $fixed_count"
if [ $fixed_count -eq 0 ]; then
  echo "✅ No fixes needed - everything is aligned!"
fi
