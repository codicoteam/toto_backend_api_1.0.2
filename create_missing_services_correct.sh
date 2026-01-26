#!/bin/bash

echo "í´ Creating missing services matching your pattern..."

# Create services directory if it doesn't exist
mkdir -p services

# Get all controller files
controllers=$(ls controllers/*.js 2>/dev/null | sed 's|controllers/||; s|\.js||' | sort)

for controller in $controllers; do
    echo ""
    echo "=== Processing $controller ==="
    
    # Extract service import from controller
    service_import=$(grep -h "require.*services" "controllers/${controller}.js" | head -1)
    
    if [ -z "$service_import" ]; then
        echo "âš ï¸  No service import found in controller"
        continue
    fi
    
    # Extract service filename
    service_file=$(echo "$service_import" | sed -n "s|.*require(\"../services/\([a-zA-Z_/]\+\)\.js\").*|\1|p")
    
    if [ -z "$service_file" ]; then
        echo "âš ï¸  Could not parse service filename"
        continue
    fi
    
    service_path="services/${service_file}.js"
    service_name=$(basename "$service_file")
    model_name=$(echo "$service_name" | sed 's/_service//')
    
    echo "Service needed: $service_file.js"
    
    # Check if service exists
    if [ -f "$service_path" ]; then
        echo "âœ… Service already exists"
        continue
    fi
    
    echo "âŒ Creating missing service..."
    
    # Check for model file
    model_file=""
    if [ -f "models/${model_name}_model.js" ]; then
        model_file="${model_name}_model.js"
    elif [ -f "models/${model_name}.js" ]; then
        model_file="${model_name}.js"
    elif [ -f "models/${model_name}_schema.js" ]; then
        model_file="${model_name}_schema.js"
    fi
    
    # Check controller functions to know what service functions to create
    controller_functions=$(grep -E "exports\.[a-zA-Z_]+ =" "controllers/${controller}.js" | sed 's/exports\.//; s/ =.*//')
    
    if [ -n "$model_file" ]; then
        echo "í³¦ Found model: $model_file"
        
        # Create service with model
        cat > "$service_path" << SERVICE_TEMPLATE
const ${model_name^} = require('../models/${model_file%.*}');

// Service to create a new ${model_name}
const create${model_name^} = async (data) => {
    try {
        // Check if unique field already exists (e.g., email)
        if (data.email) {
            const existing = await ${model_name^}.findOne({ email: data.email });
            if (existing) {
                throw new Error('Email already exists');
            }
        }
        
        const new${model_name^} = new ${model_name^}(data);
        await new${model_name^}.save();
        return new${model_name^};
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get all ${model_name}s
const getAll${model_name^}s = async () => {
    try {
        return await ${model_name^}.find();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get ${model_name} by ID
const get${model_name^}ById = async (id) => {
    try {
        const data = await ${model_name^}.findById(id);
        if (!data) {
            throw new Error('${model_name^} not found');
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to update a ${model_name}
const update${model_name^} = async (id, updateData) => {
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
        throw new Error(error.message);
    }
};

// Service to delete a ${model_name}
const delete${model_name^} = async (id) => {
    try {
        const deletedData = await ${model_name^}.findByIdAndDelete(id);
        if (!deletedData) {
            throw new Error('${model_name^} not found');
        }
        return deletedData;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Basic CRUD functions for generic controllers
const getAll = async () => {
    return getAll${model_name^}s();
};

const getById = async (id) => {
    return get${model_name^}ById(id);
};

const create = async (data) => {
    return create${model_name^}(data);
};

const update = async (id, data) => {
    return update${model_name^}(id, data);
};

const deleteById = async (id) => {
    return delete${model_name^}(id);
};

module.exports = {
    create${model_name^},
    getAll${model_name^}s,
    get${model_name^}ById,
    update${model_name^},
    delete${model_name^},
    // Basic CRUD exports
    getAll,
    getById,
    create,
    update,
    delete: deleteById
};
SERVICE_TEMPLATE
    else
        echo "âš ï¸  Model not found - creating basic service"
        
        # Create basic service without model
        cat > "$service_path" << BASIC_SERVICE
// ${model_name^} Service
// TODO: Import and use actual model when available

// Service to create a new ${model_name}
const create${model_name^} = async (data) => {
    try {
        // TODO: Implement with actual model
        return { _id: 'new_id', ...data, createdAt: new Date() };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get all ${model_name}s
const getAll${model_name^}s = async () => {
    try {
        // TODO: Implement with actual model
        return [];
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get ${model_name} by ID
const get${model_name^}ById = async (id) => {
    try {
        // TODO: Implement with actual model
        const data = { _id: id, name: "Sample ${model_name}" };
        if (!data) {
            throw new Error('${model_name^} not found');
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to update a ${model_name}
const update${model_name^} = async (id, updateData) => {
    try {
        // TODO: Implement with actual model
        return { _id: id, ...updateData, updatedAt: new Date() };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to delete a ${model_name}
const delete${model_name^} = async (id) => {
    try {
        // TODO: Implement with actual model
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Basic CRUD functions for generic controllers
const getAll = async () => {
    return getAll${model_name^}s();
};

const getById = async (id) => {
    return get${model_name^}ById(id);
};

const create = async (data) => {
    return create${model_name^}(data);
};

const update = async (id, data) => {
    return update${model_name^}(id, data);
};

const deleteById = async (id) => {
    return delete${model_name^}(id);
};

module.exports = {
    create${model_name^},
    getAll${model_name^}s,
    get${model_name^}ById,
    update${model_name^},
    delete${model_name^},
    // Basic CRUD exports
    getAll,
    getById,
    create,
    update,
    delete: deleteById
};
BASIC_SERVICE
    fi
    
    echo "âœ… Created $service_path"
done

echo ""
echo "í¾‰ All missing services created!"
echo "Services follow your pattern:"
echo "1. const function declarations"
echo "2. module.exports at bottom"
echo "3. Both specific and generic CRUD functions"
