#!/bin/bash

echo "Fixing all service-model relationships..."

# First, create any missing models
echo "1. Creating missing models..."
for service in services/*_service.js; do
  name=$(basename "$service" "_service.js")
  model_file="models/${name}_model.js"
  
  # Check if model exists
  if [ ! -f "$model_file" ]; then
    echo "  Creating model for: $name"
    
    # Try to find what model name is being imported
    current_import=$(grep -i "require.*models" "$service" | head -1)
    
    if [ -n "$current_import" ]; then
      imported_model=$(echo "$current_import" | sed "s/.*models\///" | sed "s/['\")].*//")
      echo "    Service is trying to import: $imported_model"
      
      # Check if that imported model exists
      if [ -f "models/$imported_model" ]; then
        echo "    ✅ Imported model exists: $imported_model"
      else
        echo "    ⚠️  Imported model doesn't exist, creating ${name}_model.js"
        # Create the model
        cat > "$model_file" << MODEL
// ${name} Model
const mongoose = require('mongoose');

const ${name}Schema = new mongoose.Schema({
  // Add fields based on service needs
  name: { type: String },
  data: { type: mongoose.Schema.Types.Mixed },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('${name^}', ${name}Schema);
MODEL
        
        # Update service to import the new model
        sed -i "s|require(\"../models/${imported_model}\")|require(\"../models/${name}_model\")|g" "$service"
        echo "    ✅ Created and linked $model_file"
      fi
    else
      echo "    ℹ️  No model import found in service"
    fi
  else
    echo "  ✅ Model exists for: $name"
  fi
done

echo ""
echo "2. Fixing model imports in services..."
for service in services/*_service.js; do
  name=$(basename "$service" "_service.js")
  expected_model="${name}_model.js"
  
  if [ -f "models/$expected_model" ]; then
    # Check what's currently being imported
    current_import=$(grep -i "require.*models" "$service" | head -1)
    
    if [ -n "$current_import" ]; then
      imported_model=$(echo "$current_import" | sed "s/.*models\///" | sed "s/['\")].*//")
      
      if [ "$imported_model" != "$expected_model" ]; then
        echo "  Fixing $name: $imported_model -> $expected_model"
        sed -i "s|require(\"../models/${imported_model}\")|require(\"../models/${expected_model}\")|g" "$service"
      fi
    else
      # No import found, add one
      echo "  Adding model import to $name"
      sed -i "1s|^|const ${name}Model = require(\"../models/${expected_model}\");\n|" "$service"
    fi
  fi
done

echo ""
echo "✅ All services and models fixed!"
