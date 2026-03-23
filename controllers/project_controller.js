const projectService = require("../services/project_service");

/**
 * Create a new project (Admin only)
 */
exports.createProject = async (req, res) => {
  try {
    // Add the admin ID from the authenticated user
    req.body.createdBy = req.user.id;
    
    const project = await projectService.createProject(req.body);
    
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

/**
 * Get all projects (Authenticated users)
 */
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    
    res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      data: projects,
      count: projects.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve projects",
      error: error.message,
    });
  }
};

/**
 * Get project by ID
 */
exports.getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Project retrieved successfully",
      data: project,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Project not found",
      error: error.message,
    });
  }
};

/**
 * Get projects by subject ID
 */
exports.getProjectsBySubjectId = async (req, res) => {
  try {
    const projects = await projectService.getProjectsBySubjectId(req.params.subjectId);
    
    res.status(200).json({
      success: true,
      message: "Projects retrieved by subject",
      data: projects,
      count: projects.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve projects",
      error: error.message,
    });
  }
};

/**
 * Get projects by level
 */
exports.getProjectsByLevel = async (req, res) => {
  try {
    const projects = await projectService.getProjectsByLevel(req.params.level);
    
    res.status(200).json({
      success: true,
      message: "Projects retrieved by level",
      data: projects,
      count: projects.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve projects",
      error: error.message,
    });
  }
};

/**
 * Update project (Admin only)
 */
exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await projectService.updateProject(req.params.id, req.body);
    
    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};

/**
 * Delete project (Soft delete - Admin only)
 */
exports.deleteProject = async (req, res) => {
  try {
    const result = await projectService.deleteProject(req.params.id);
    
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};

/**
 * Purchase project (Student only) - Enforces one-per-school rule
 */
exports.purchaseProject = async (req, res) => {
  try {
    const studentId = req.user.id;
    const project = await projectService.purchaseProject(req.params.id, studentId);
    
    res.status(200).json({
      success: true,
      message: "Project purchased successfully",
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to purchase project",
      error: error.message,
    });
  }
};

/**
 * Get purchased projects for authenticated student
 */
exports.getPurchasedProjects = async (req, res) => {
  try {
    const studentId = req.user.id;
    const projects = await projectService.getPurchasedProjectsByStudent(studentId);
    
    res.status(200).json({
      success: true,
      message: "Purchased projects retrieved successfully",
      data: projects,
      count: projects.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve purchased projects",
      error: error.message,
    });
  }
};
