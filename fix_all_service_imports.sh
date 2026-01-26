#!/bin/bash

echo "Fixing service imports..."

# First, standardize all service filenames to snake_case
echo "1. Standardizing filenames..."
for file in services/*.js; do
  if [ -f "$file" ]; then
    base=$(basename "$file" ".js")
    # Convert camelCase to snake_case
    snake_version=$(echo "$base" | sed -r 's/([a-z])([A-Z])/\1_\2/g' | tr '[:upper:]' '[:lower:]' | sed 's/__/_/g')
    
    if [ "$base" != "$snake_version" ]; then
      echo "  Renaming: $base.js -> ${snake_version}.js"
      mv "$file" "services/${snake_version}.js"
    fi
  fi
done

echo ""
echo "2. Fixing controller imports..."
for controller in controllers/*_controller.js; do
  name=$(basename "$controller" "_controller.js")
  
  # What service file should exist (snake_case)
  expected_service="${name}_service.js"
  
  # Check what's actually being imported
  current_line=$(head -3 "$controller" | grep -i "require.*services")
  
  if [ -n "$current_line" ]; then
    # Extract the imported filename
    imported_file=$(echo "$current_line" | sed "s/.*services\///" | sed "s/['\")].*//" | sed "s/.*\///")
    
    # If expected service exists, fix the import
    if [ -f "services/$expected_service" ]; then
      if [ "$imported_file" != "$expected_service" ]; then
        echo "  Fixing $name: $imported_file -> $expected_service"
        # Replace the import line
        sed -i "1s|const.*= require.*services.*|const ${name}Service = require(\"../services/${expected_service}\");|" "$controller"
      else
        echo "  ✅ $name: Import already correct"
      fi
    else
      echo "  ⚠️  $name: Service file not found ($expected_service)"
    fi
  else
    echo "  ℹ️  $name: No service import found"
  fi
done

echo ""
echo "✅ Done!"
