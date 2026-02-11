#!/bin/bash
echo "Updating all services to return placeholders..."

for service in services/*.js; do
  base=$(basename "$service" _service.js)
  
  echo "--- $base ---"
  
  # Check if service already has proper functions
  if grep -q "exports.getAll" "$service" && grep -q "exports.create" "$service"; then
    echo "  ✓ Already has CRUD methods"
    continue
  fi
  
  # Create/update service with placeholders
  cat > "$service" << SERVICE_EOF
// ${base^} Service - Placeholder implementation
// TODO: Connect to actual database/model

exports.getAll = async () => {
  // Placeholder: Return mock data
  console.log("Getting all ${base} (placeholder)");
  return [
    {
      id: "1",
      name: "Sample ${base^} 1",
      description: "This is a placeholder ${base}",
      createdAt: new Date().toISOString()
    },
    {
      id: "2", 
      name: "Sample ${base^} 2",
      description: "Another placeholder ${base}",
      createdAt: new Date().toISOString()
    }
  ];
};

exports.getById = async (id) => {
  // Placeholder: Return mock data
  console.log("Getting ${base} by ID: " + id + " (placeholder)");
  return {
    id: id,
    name: "Sample ${base^} " + id,
    description: "This is a placeholder ${base} with ID " + id,
    details: "More placeholder data for ${base}",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

exports.create = async (data) => {
  // Placeholder: Return mock created data
  console.log("Creating ${base} (placeholder):", data);
  return {
    id: "new-" + Date.now(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

exports.update = async (id, data) => {
  // Placeholder: Return mock updated data
  console.log("Updating ${base} " + id + " (placeholder):", data);
  return {
    id: id,
    ...data,
    updatedAt: new Date().toISOString()
  };
};

exports.delete = async (id) => {
  // Placeholder: Return success message
  console.log("Deleting ${base} " + id + " (placeholder)");
  return { 
    success: true, 
    message: "${base^} " + id + " deleted successfully (placeholder)",
    deletedId: id 
  };
};
SERVICE_EOF

  # Add login method if it's an auth-related service
  if [[ "$base" =~ ^(admin|student|teacher)$ ]]; then
    cat >> "$service" << AUTH_EOF

// Login placeholder
exports.login = async (credentials) => {
  console.log("${base^} login attempt (placeholder):", credentials.email);
  
  // Mock successful login
  return {
    success: true,
    token: "jwt-token-placeholder-" + Date.now(),
    user: {
      id: "1",
      email: credentials.email,
      name: "Placeholder ${base^} User",
      role: "${base}"
    },
    message: "Login successful (placeholder - implement real auth)"
  };
};

// Alias for compatibility
exports.login${base^} = exports.login;
AUTH_EOF
    echo "  ✓ Added login method for ${base}"
  fi

  echo "  ✓ Updated ${base}_service.js with placeholder methods"
done

echo ""
echo "=== SERVICE UPDATE COMPLETE ==="
