#!/bin/bash

echo "íº¨ EMERGENCY FIX - CREATING ALL MISSING MODELS"

# First, list all services
for service in services/*_service.js; do
  service_name=$(basename "$service" "_service.js")
  
  # Determine model name (remove temp_ prefix)
  if [[ $service_name == temp_* ]]; then
    model_name=${service_name#temp_}
  else
    model_name=$service_name
  fi
  
  # Check if model exists
  model_exists=false
  for model_file in models/*.js; do
    model_base=$(basename "$model_file" ".js")
    if [[ "$model_base" == "$model_name" ]] || [[ "$model_base" == "${model_name}_model" ]]; then
      model_exists=true
      actual_model=$(basename "$model_file")
      break
    fi
  done
  
  if [ "$model_exists" = false ]; then
    echo "Creating model for: $service_name -> $model_name.js"
    
    # Create basic model
    cat > "models/${model_name}.js" << MODEL
// ${model_name} Model
const mongoose = require('mongoose');

const ${model_name}Schema = new mongoose.Schema({
  // Basic fields
  name: { type: String },
  description: { type: String },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('${model_name^}', ${model_name}Schema);
MODEL
    
    # Update service to import this model
    sed -i "s|require(\"../models/[^\"]*\")|require(\"../models/${model_name}.js\")|g" "$service"
  fi
done

echo ""
echo "âœ… All missing models created!"
echo "Starting server..."
npm start
