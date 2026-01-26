#!/bin/bash

echo "=== FIXING ALL DUPLICATE DECLARATIONS ==="

# Fix all services
for service in services/*_service.js; do
  service_name=$(basename "$service" "_service.js")
  echo "Checking: $service_name"
  
  # Check for duplicate require statements
  require_count=$(grep -c "require.*models" "$service")
  
  if [ "$require_count" -gt 1 ]; then
    echo "  ⚠️  Found $require_count require statements"
    
    # Get the first require line
    first_require=$(grep -n "require.*models" "$service" | head -1)
    first_line=$(echo "$first_require" | cut -d: -f1)
    first_content=$(echo "$first_require" | cut -d: -f2-)
    
    # Remove all other require statements
    sed -i "/require.*models/d" "$service"
    
    # Add back the first one at the beginning
    sed -i "1s|^|${first_content}\n|" "$service"
    
    echo "  ✅ Fixed duplicate requires"
  fi
  
  # Check for duplicate const declarations
  const_lines=$(grep -n "^const " "$service" | cut -d: -f1)
  const_vars=$(grep "^const " "$service" | sed 's/const //' | sed 's/ =.*//')
  
  # Check for duplicate variable names
  declare -A var_count
  for var in $const_vars; do
    ((var_count[$var]++))
  done
  
  for var in "${!var_count[@]}"; do
    if [ "${var_count[$var]}" -gt 1 ]; then
      echo "  ⚠️  Duplicate variable: $var (${var_count[$var]} times)"
      
      # Keep only the first occurrence
      first_line=$(grep -n "^const $var = " "$service" | head -1 | cut -d: -f1)
      line_num=1
      for line in $(grep -n "^const $var = " "$service" | cut -d: -f1); do
        if [ "$line" -ne "$first_line" ]; then
          sed -i "${line}d" "$service"
          echo "    Removed duplicate at line $line"
        fi
      done
    fi
  done
done

echo ""
echo "✅ All duplicates fixed!"
