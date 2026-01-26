#!/bin/bash

echo "�� CLEANING AND STARTING SERVER..."

# 1. Fix model compilation errors
echo "1. Fixing model issues..."
if [ -f "models/subject_model.js" ] && [ -f "models/subjects_model.js" ]; then
  echo "  Removing duplicate subject_model.js"
  rm models/subject_model.js
fi

# 2. Create any missing temp services
echo "2. Creating missing temp services..."
for controller in controllers/temp_*_controller.js; do
  name=$(basename "$controller" "_controller.js")
  service_file="services/${name}_service.js"
  
  if [ ! -f "$service_file" ]; then
    echo "  Creating $service_file"
    base_name=${name#temp_}
    
    cat > "$service_file" << SERVICE
// ${name} Service
const ${base_name}Model = require("../models/${base_name}_model");

exports.getAll = async (filters = {}) => {
  return await ${base_name}Model.find(filters);
};

exports.getById = async (id) => {
  return await ${base_name}Model.findById(id);
};

exports.create = async (data) => {
  return await ${base_name}Model.create(data);
};

exports.update = async (id, data) => {
  return await ${base_name}Model.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await ${base_name}Model.findByIdAndDelete(id);
};
SERVICE
  fi
  
  # Fix controller import
  sed -i "1s|^.*$|const ${name}Service = require(\"../services/${name}_service.js\");|" "$controller"
done

# 3. Fix regular controller imports
echo "3. Fixing regular controller imports..."
for controller in controllers/*_controller.js; do
  name=$(basename "$controller" "_controller.js")
  
  # Skip temp controllers (already handled)
  if [[ $name != temp_* ]]; then
    service_file="services/${name}_service.js"
    
    if [ -f "$service_file" ]; then
      sed -i "1s|^.*$|const ${name}Service = require(\"../services/${name}_service.js\");|" "$controller"
    fi
  fi
done

# 4. Test everything
echo "4. Testing..."
node -c server.js && echo "✅ server.js valid" || echo "❌ server.js invalid"

# 5. Start server
echo ""
echo "5. Starting server..."
npm start
