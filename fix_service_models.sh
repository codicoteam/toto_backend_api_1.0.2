#!/bin/bash

echo "Fixing service model imports..."

for service in services/*_service.js; do
  name=$(basename "$service" "_service.js")
  echo "Checking: $name"
  
  # Check what model is being imported
  model_import=$(head -5 "$service" | grep -i "require.*models")
  
  if [ -n "$model_import" ]; then
    # Extract the model filename
    imported_model=$(echo "$model_import" | sed "s/.*models\///" | sed "s/['\")].*//" | sed "s/.*\///")
    
    # Check if model exists
    if [ -f "models/$imported_model" ]; then
      echo "  ✅ Model exists: $imported_model"
    else
      echo "  ⚠️  Model not found: $imported_model"
      
      # Try to find a similar model
      possible_model=$(ls models/ | grep -i "$name" | head -1)
      
      if [ -n "$possible_model" ]; then
        echo "    Found similar model: $possible_model"
        # Fix the import
        sed -i "s|require(\"../models/${imported_model}\")|require(\"../models/${possible_model}\")|g" "$service"
        echo "  ✅ Updated import to: $possible_model"
      else
        echo "  ❌ No model found for $name"
        
        # Check if we should create a basic model
        read -p "Create basic model for $name? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
          model_file="models/${name}_model.js"
          cat > "$model_file" << MODEL
// ${name} Model
const mongoose = require('mongoose');

const ${name}Schema = new mongoose.Schema({
  // Add your schema fields here
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('${name^}', ${name}Schema);
MODEL
          echo "  ✅ Created basic model: $model_file"
        fi
      fi
    fi
  else
    echo "  ℹ️  No model import found"
  fi
  
  echo ""
done

echo "✅ Done!"
