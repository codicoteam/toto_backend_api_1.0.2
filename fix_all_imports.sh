#!/bin/bash

echo "=== COMPREHENSIVE IMPORT FIX ==="

# First, standardize all service filenames to snake_case
echo "Standardizing service filenames..."
for file in services/*.js; do
  if [[ -f "$file" ]]; then
    base=$(basename "$file" ".js")
    snake_version=$(echo "$base" | sed -r 's/([a-z])([A-Z])/\1_\2/g' | tr '[:upper:]' '[:lower:]' | sed 's/__/_/g')
    
    if [ "$base" != "$snake_version" ]; then
      echo "Renaming: $file -> services/${snake_version}.js"
      mv "$file" "services/${snake_version}.js"
    fi
  fi
done

# Fix all controller imports
echo "Fixing controller imports..."
for controller in controllers/*_controller.js; do
  name=$(basename "$controller" "_controller.js")
  
  # What service should be imported
  expected_service="${name}_service.js"
  
  # What is actually being imported
  current_import=$(grep -o "require(\"\.\./services/[^\"]*")" "$controller" | head -1 | sed "s|.*/services/||" | sed "s/['\")]//g")
  
  if [ -n "$current_import" ] && [ "$current_import" != "$expected_service" ]; then
    # Check if expected service exists
    if [ -f "services/$expected_service" ]; then
      echo "Fixing $name: $current_import -> $expected_service"
      sed -i "s|require(\"\.\./services/${current_import}\")|require(\"../services/${expected_service}\")|g" "$controller"
    fi
  fi
done

echo "✅ All imports fixed!"
