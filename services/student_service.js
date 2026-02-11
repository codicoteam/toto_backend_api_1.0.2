// Student Service - Placeholder implementation
// TODO: Connect to actual database/model

exports.getAll = async () => {
  // Placeholder: Return mock data
  console.log("Getting all student (placeholder)");
  return [
    {
      id: "1",
      name: "Sample Student 1",
      description: "This is a placeholder student",
      createdAt: new Date().toISOString()
    },
    {
      id: "2", 
      name: "Sample Student 2",
      description: "Another placeholder student",
      createdAt: new Date().toISOString()
    }
  ];
};

exports.getById = async (id) => {
  // Placeholder: Return mock data
  console.log("Getting student by ID: " + id + " (placeholder)");
  return {
    id: id,
    name: "Sample Student " + id,
    description: "This is a placeholder student with ID " + id,
    details: "More placeholder data for student",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

exports.create = async (data) => {
  // Placeholder: Return mock created data
  console.log("Creating student (placeholder):", data);
  return {
    id: "new-" + Date.now(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

exports.update = async (id, data) => {
  // Placeholder: Return mock updated data
  console.log("Updating student " + id + " (placeholder):", data);
  return {
    id: id,
    ...data,
    updatedAt: new Date().toISOString()
  };
};

exports.delete = async (id) => {
  // Placeholder: Return success message
  console.log("Deleting student " + id + " (placeholder)");
  return { 
    success: true, 
    message: "Student " + id + " deleted successfully (placeholder)",
    deletedId: id 
  };
};

// Login placeholder
exports.login = async (credentials) => {
  console.log("Student login attempt (placeholder):", credentials.email);
  
  // Mock successful login
  return {
    success: true,
    token: "jwt-token-placeholder-" + Date.now(),
    user: {
      id: "1",
      email: credentials.email,
      name: "Placeholder Student User",
      role: "student"
    },
    message: "Login successful (placeholder - implement real auth)"
  };
};

// Alias for compatibility
exports.loginStudent = exports.login;
