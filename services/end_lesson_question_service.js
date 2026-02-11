// End_lesson_question Service - Placeholder implementation
// TODO: Connect to actual database/model

exports.getAll = async () => {
  // Placeholder: Return mock data
  console.log("Getting all end_lesson_question (placeholder)");
  return [
    {
      id: "1",
      name: "Sample End_lesson_question 1",
      description: "This is a placeholder end_lesson_question",
      createdAt: new Date().toISOString()
    },
    {
      id: "2", 
      name: "Sample End_lesson_question 2",
      description: "Another placeholder end_lesson_question",
      createdAt: new Date().toISOString()
    }
  ];
};

exports.getById = async (id) => {
  // Placeholder: Return mock data
  console.log("Getting end_lesson_question by ID: " + id + " (placeholder)");
  return {
    id: id,
    name: "Sample End_lesson_question " + id,
    description: "This is a placeholder end_lesson_question with ID " + id,
    details: "More placeholder data for end_lesson_question",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

exports.create = async (data) => {
  // Placeholder: Return mock created data
  console.log("Creating end_lesson_question (placeholder):", data);
  return {
    id: "new-" + Date.now(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

exports.update = async (id, data) => {
  // Placeholder: Return mock updated data
  console.log("Updating end_lesson_question " + id + " (placeholder):", data);
  return {
    id: id,
    ...data,
    updatedAt: new Date().toISOString()
  };
};

exports.delete = async (id) => {
  // Placeholder: Return success message
  console.log("Deleting end_lesson_question " + id + " (placeholder)");
  return { 
    success: true, 
    message: "End_lesson_question " + id + " deleted successfully (placeholder)",
    deletedId: id 
  };
};
