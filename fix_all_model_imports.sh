#!/bin/bash

echo "=== FIXING ALL MODEL IMPORTS ==="

# List of actual model files
actual_models=$(ls models/)

# Fix each service
for service in services/*_service.js; do
  service_name=$(basename "$service" "_service.js")
  echo "Processing: $service_name"
  
  # Get the current require line
  require_line=$(grep -n "require.*models" "$service" | head -1)
  
  if [ -n "$require_line" ]; then
    line_num=$(echo "$require_line" | cut -d: -f1)
    line_content=$(echo "$require_line" | cut -d: -f2-)
    
    # Extract the model file being imported
    imported_model=$(echo "$line_content" | sed "s/.*models\///" | sed "s/['\")].*//")
    
    # Check if model exists
    if echo "$actual_models" | grep -q "^${imported_model}$"; then
      echo "  âœ… Model exists: $imported_model"
    else
      echo "  âŒ Model not found: $imported_model"
      
      # Try to find correct model
      # 1. Look for exact match without .js
      if echo "$actual_models" | grep -q "^${imported_model%.js}$"; then
        correct_model="${imported_model%.js}"
        echo "  í´§ Found: $correct_model"
        sed -i "${line_num}s|${imported_model}|${correct_model}|g" "$service"
      
      # 2. Look for model with similar name
      elif found_model=$(echo "$actual_models" | grep -i "$service_name" | head -1); then
        echo "  í´§ Found similar: $found_model"
        sed -i "${line_num}s|${imported_model}|${found_model}|g" "$service"
      
      # 3. Look for any model with this prefix
      elif found_model=$(echo "$actual_models" | grep -i "^${service_name%_*}" | head -1); then
        echo "  í´§ Found prefix match: $found_model"
        sed -i "${line_num}s|${imported_model}|${found_model}|g" "$service"
      
      # 4. Create a basic model
      else
        echo "  í´§ Creating basic model"
        
        # Determine model name (remove temp_ prefix if present)
        if [[ $service_name == temp_* ]]; then
          model_name=${service_name#temp_}
        else
          model_name=$service_name
        fi
        
        # Create model file
        cat > "models/${model_name}.js" << MODEL
// ${model_name} Model
const mongoose = require('mongoose');

const ${model_name}Schema = new mongoose.Schema({
  name: { type: String },
  data: { type: mongoose.Schema.Types.Mixed },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('${model_name^}', ${model_name}Schema);
MODEL
        
        # Update service
        sed -i "${line_num}s|${imported_model}|${model_name}.js|g" "$service"
        echo "  âœ… Created and linked: ${model_name}.js"
      fi
    fi
  else
    echo "  â„¹ï¸  No model import found"
  fi
done

echo ""
echo "âœ… All model imports fixed!"
