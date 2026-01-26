#!/bin/bash

echo "=== MASTER FIX FOR ALL SERVICES AND MODELS ==="

# 1. First, ensure all models exist
echo "1. Ensuring all models exist..."
for service in services/*_service.js; do
  service_name=$(basename "$service" "_service.js")
  
  # Remove temp_ prefix if present
  if [[ $service_name == temp_* ]]; then
    model_name=${service_name#temp_}
  else
    model_name=$service_name
  fi
  
  # Check if model exists (try multiple variations)
  model_found=""
  for model_file in models/${model_name}.js models/${model_name}_model.js models/${model_name}_schema.js; do
    if [ -f "$model_file" ]; then
      model_found=$(basename "$model_file")
      break
    fi
  done
  
  if [ -z "$model_found" ]; then
    echo "  Creating model: models/${model_name}.js"
    cat > "models/${model_name}.js" << MODEL
// ${model_name} Model
const mongoose = require('mongoose');

const ${model_name}Schema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('${model_name^}', ${model_name}Schema);
MODEL
    model_found="${model_name}.js"
  fi
done

# 2. Fix all service imports
echo ""
echo "2. Fixing all service imports..."
for service in services/*_service.js; do
  service_name=$(basename "$service" "_service.js")
  
  # Remove temp_ prefix if present
  if [[ $service_name == temp_* ]]; then
    model_name=${service_name#temp_}
    var_name=${service_name}Model
  else
    model_name=$service_name
    var_name=${service_name}Model
  fi
  
  # Find the actual model file
  actual_model=""
  for model_file in models/${model_name}.js models/${model_name}_model.js models/${model_name}_schema.js; do
    if [ -f "$model_file" ]; then
      actual_model=$(basename "$model_file")
      break
    fi
  done
  
  if [ -n "$actual_model" ]; then
    # Check if service has a require statement
    if grep -q "require.*models" "$service"; then
      # Replace existing require
      sed -i "s|require(\"../models/[^\"]*\")|require(\"../models/${actual_model}\")|g" "$service"
      # Also fix variable name if needed
      sed -i "s|const [a-zA-Z]* = require|const ${var_name} = require|" "$service"
    else
      # Add require at the beginning
      sed -i "1s|^|const ${var_name} = require(\"../models/${actual_model}\");\n|" "$service"
    fi
    echo "  ‚úÖ $service_name -> $actual_model"
  else
    echo "  ‚ùå No model found for $service_name"
  fi
done

echo ""
echo "3. Testing everything..."
node -c server.js && echo "‚úÖ server.js valid" || echo "‚ùå server.js invalid"

echo ""
echo "Ìæâ MASTER FIX COMPLETE!"
