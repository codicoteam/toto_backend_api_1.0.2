#!/bin/bash

echo "Ì¥Ñ Updating ALL services to use correct models..."

for service_file in services/*.js; do
    if [ -f "$service_file" ]; then
        service_name=$(basename "$service_file" .js)
        model_name=$(echo "$service_name" | sed 's/_service//')
        
        echo "Processing: $service_name"
        
        # Check if model exists
        if [ -f "models/${model_name}_model.js" ] || [ -f "models/${model_name}.js" ]; then
            # Update the service to use the model
            if grep -q "TODO: Replace with actual model" "$service_file" || \
               grep -q "Model not found" "$service_file" || \
               ! grep -q "require.*models" "$service_file"; then
                
                echo "  Ì¥ß Updating to use model: ${model_name}"
                
                # Create updated service file
                cat > "${service_file}.new" << UPDATED_SERVICE
const ${model_name^} = require('../models/${model_name}_model');

// Get all ${model_name} records
exports.getAll = async (filters = {}) => {
    try {
        const data = await ${model_name^}.find(filters);
        return data;
    } catch (error) {
        throw new Error(\`Failed to retrieve ${model_name} records: \${error.message}\`);
    }
};

// Get ${model_name} by ID
exports.getById = async (id) => {
    try {
        const data = await ${model_name^}.findById(id);
        if (!data) {
            throw new Error('${model_name^} not found');
        }
        return data;
    } catch (error) {
        throw new Error(\`Failed to retrieve ${model_name}: \${error.message}\`);
    }
};

// Create new ${model_name}
exports.create = async (data) => {
    try {
        const newData = new ${model_name^}(data);
        const savedData = await newData.save();
        return savedData;
    } catch (error) {
        throw new Error(\`Failed to create ${model_name}: \${error.message}\`);
    }
};

// Update ${model_name}
exports.update = async (id, updateData) => {
    try {
        const updatedData = await ${model_name^}.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedData) {
            throw new Error('${model_name^} not found');
        }
        return updatedData;
    } catch (error) {
        throw new Error(\`Failed to update ${model_name}: \${error.message}\`);
    }
};

// Delete ${model_name}
exports.delete = async (id) => {
    try {
        const deletedData = await ${model_name^}.findByIdAndDelete(id);
        if (!deletedData) {
            throw new Error('${model_name^} not found');
        }
        return deletedData;
    } catch (error) {
        throw new Error(\`Failed to delete ${model_name}: \${error.message}\`);
    }
};
UPDATED_SERVICE
                
                # Replace the old file
                mv "${service_file}.new" "$service_file"
            else
                echo "  ‚úÖ Already uses model"
            fi
        else
            echo "  ‚ö†Ô∏è  Model not found for ${model_name}"
        fi
    fi
done

echo ""
echo "Ìæâ All services updated!"
