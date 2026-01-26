#!/bin/bash

echo "í´§ Fixing ALL service files..."

for service_file in services/*.js; do
    if [ -f "$service_file" ]; then
        service_name=$(basename "$service_file" .js)
        base_name=$(echo "$service_name" | sed 's/_service//')
        
        echo "Processing: $service_name"
        
        # Check what model it's trying to import
        current_import=$(grep "require.*models" "$service_file" | head -1)
        
        if [ -n "$current_import" ]; then
            # Extract current model name
            current_model=$(echo "$current_import" | sed -n "s|.*require(\"../models/\([a-zA-Z_]\+\)\").*|\1|p")
            
            if [ -n "$current_model" ]; then
                # Check if that model exists
                if [ ! -f "models/${current_model}.js" ] && [ ! -f "models/${current_model}_model.js" ]; then
                    echo "  âš ï¸  Model $current_model not found, using ${base_name}_model"
                    
                    # Update import
                    sed -i "s|require(\"../models/${current_model}\")|require(\"../models/${base_name}_model\")|" "$service_file"
                    
                    # Update model usage in the file
                    sed -i "s/${current_model}/${base_name^}/g" "$service_file" 2>/dev/null
                fi
            fi
        else
            # No import found, add one
            echo "  âž• Adding model import"
            
            # Check if model exists
            if [ -f "models/${base_name}_model.js" ]; then
                # Add import at the top
                sed -i "1s|^|const ${base_name^} = require('../models/${base_name}_model');\n|" "$service_file"
                
                # Fix function bodies to use the model
                sed -i "s/\/\/ TODO:.*//g" "$service_file"
                sed -i "s/return \[\];/return await ${base_name^}.find();/g" "$service_file"
                sed -i "s/return { _id: id.*}/return await ${base_name^}.findById(id);/g" "$service_file"
                sed -i "s/return { _id: 'new_id'.*}/const newData = new ${base_name^}(data);\n        return await newData.save();/g" "$service_file"
            fi
        fi
        
        # Also fix any syntax errors with backticks
        sed -i 's/\\\`/`/g' "$service_file"
        sed -i 's/\\\${/\${/g' "$service_file"
    fi
done

echo ""
echo "í¾‰ All services fixed!"
