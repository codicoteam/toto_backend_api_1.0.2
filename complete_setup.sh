#!/bin/bash

echo "íº€ Completing Toto Academy Backend Setup..."

# 1. Create missing admin controller
if [ ! -f "controllers/admin_controller.js" ]; then
    echo "í³ Creating admin_controller.js..."
    cat > controllers/admin_controller.js << 'ADMINCONTROLLER'
const adminService = require("../services/admin_service");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "toto_academy_2025";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "96h";

// Admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const admin = await adminService.getAdminForAuth(email);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role, type: 'admin' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { password: _pw, __v, ...adminWithoutPassword } = admin.toObject();
    res.status(200).json({ 
      success: true,
      message: "Login successful", 
      token, 
      data: adminWithoutPassword 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Login failed", 
      error: error.message 
    });
  }
};

// Admin registration
exports.registerAdmin = async (req, res) => {
  try {
    const newAdmin = await adminService.createAdmin(req.body);

    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email, role: newAdmin.role, type: 'admin' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({ 
      success: true,
      message: "Admin registered successfully", 
      data: newAdmin, 
      token 
    });
  } catch (error) {
    if (error.message === "Email already exists") {
      return res.status(409).json({ 
        success: false,
        message: "Email already exists" 
      });
    }
    res.status(400).json({ 
      success: false,
      message: "Error registering admin", 
      error: error.message 
    });
  }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.status(200).json({ 
      success: true,
      message: "Admins retrieved successfully", 
      data: admins 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error retrieving admins", 
      error: error.message 
    });
  }
};

// Get admin by email
exports.getAdminByEmail = async (req, res) => {
  try {
    const admin = await adminService.getAdminByEmail(req.params.email);
    if (!admin) {
      return res.status(404).json({ 
        success: false,
        message: "Admin not found" 
      });
    }
    res.status(200).json({ 
      success: true,
      message: "Admin retrieved successfully", 
      data: admin 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error retrieving admin", 
      error: error.message 
    });
  }
};

// Update admin
exports.updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await adminService.updateAdmin(req.params.id, req.body);
    res.status(200).json({ 
      success: true,
      message: "Admin updated successfully", 
      data: updatedAdmin 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error updating admin", 
      error: error.message 
    });
  }
};

// Delete admin
exports.deleteAdmin = async (req, res) => {
  try {
    await adminService.deleteAdmin(req.params.id);
    res.status(200).json({ 
      success: true,
      message: "Admin deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error deleting admin", 
      error: error.message 
    });
  }
};

// Get admin by ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await adminService.getAdminById(req.params.id);
    res.status(200).json({ 
      success: true,
      message: "Admin retrieved successfully", 
      data: admin 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error fetching admin", 
      error: error.message 
    });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await adminService.generateAndSendPasswordResetOTP(email);
    res.status(200).json({ 
      success: true,
      ...result 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Verify reset OTP
exports.verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await adminService.verifyPasswordResetOTP(email, otp);
    res.status(200).json({ 
      success: true,
      ...result 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const result = await adminService.resetPassword(email, newPassword);
    res.status(200).json({ 
      success: true,
      ...result 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Create admin (main admin only)
exports.createAdmin = async (req, res) => {
  try {
    const newAdmin = await adminService.createAdmin(req.body);
    res.status(201).json({ 
      success: true,
      message: "New admin created successfully", 
      data: newAdmin 
    });
  } catch (error) {
    if (error.message === "Email already exists") {
      return res.status(409).json({ 
        success: false,
        message: "Email already exists" 
      });
    }
    res.status(400).json({ 
      success: false,
      message: "Error creating admin", 
      error: error.message 
    });
  }
};

// Community admin management
exports.addAdminToCommunity = async (req, res) => {
  try {
    const { adminId } = req.body;
    const communityService = require("../services/community_service");
    const updatedCommunity = await communityService.addAdminToCommunity(
      req.params.communityId,
      adminId
    );
    res.status(200).json({ 
      success: true,
      message: "Admin added to community successfully", 
      data: updatedCommunity 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: "Failed to add admin to community", 
      error: error.message 
    });
  }
};

exports.removeAdminFromCommunity = async (req, res) => {
  try {
    const { adminId } = req.body;
    const communityService = require("../services/community_service");
    const updatedCommunity = await communityService.removeAdminFromCommunity(
      req.params.communityId,
      adminId
    );
    res.status(200).json({ 
      success: true,
      message: "Admin removed from community successfully", 
      data: updatedCommunity 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: "Failed to remove admin from community", 
      error: error.message 
    });
  }
};

exports.removeStudentFromCommunity = async (req, res) => {
  try {
    const { studentId } = req.body;
    const communityService = require("../services/community_service");
    const updatedCommunity = await communityService.removeStudentFromCommunity(
      req.params.communityId,
      studentId
    );
    res.status(200).json({ 
      success: true,
      message: "Student removed from community successfully", 
      data: updatedCommunity 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: "Failed to remove student from community", 
      error: error.message 
    });
  }
};
ADMINCONTROLLER
fi

# 2. Install Swagger dependencies
echo "í³¦ Installing Swagger dependencies..."
npm install swagger-jsdoc swagger-ui-express

# 3. Create a simple script to add Swagger to all routers
echo "í³„ Creating Swagger setup script..."
cat > add_swagger_to_routers.js << 'SWAGGERSCRIPT'
const fs = require('fs');
const path = require('path');

const routersDir = path.join(__dirname, 'routers');
const files = fs.readdirSync(routersDir);

const swaggerTemplate = (routerName) => `
/**
 * @swagger
 * tags:
 *   name: ${routerName.replace('_router', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
 *   description: ${routerName.replace('_router', '').replace(/_/g, ' ')} management endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
`;

files.forEach(file => {
  if (file.endsWith('_router.js')) {
    const filePath = path.join(routersDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file already has Swagger
    if (!content.includes('@swagger')) {
      const routerName = file.replace('.js', '');
      const newContent = swaggerTemplate(routerName) + content;
      fs.writeFileSync(filePath, newContent);
      console.log(\`âœ… Added Swagger to \${file}\`);
    } else {
      console.log(\`â„¹ï¸  \${file} already has Swagger\`);
    }
  }
});

console.log('í¾‰ All routers updated with Swagger annotations!');
SWAGGERSCRIPT

# 4. Create basic controllers for remaining models
echo "í´§ Creating remaining basic controllers..."

# Subject controller
if [ ! -f "controllers/subject_controller.js" ]; then
    cat > controllers/subject_controller.js << 'SUBJECTCONTROLLER'
const subjectService = require("../services/subject_services");

exports.createSubject = async (req, res) => {
  try {
    const subject = await subjectService.createSubject(req.body);
    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: subject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create subject",
      error: error.message
    });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json({
      success: true,
      message: "Subjects retrieved successfully",
      data: subjects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve subjects",
      error: error.message
    });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const subject = await subjectService.getSubjectById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Subject retrieved successfully",
      data: subject
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Subject not found",
      error: error.message
    });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const subject = await subjectService.updateSubject(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      data: subject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update subject",
      error: error.message
    });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    await subjectService.deleteSubject(req.params.id);
    res.status(200).json({
      success: true,
      message: "Subject deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete subject",
      error: error.message
    });
  }
};
SUBJECTCONTROLLER
fi

# 5. Update server.js to include teacher router
echo "í´„ Updating server.js..."
if grep -q "teacherRouter" server.js; then
    echo "âœ… Teacher router already in server.js"
else
    sed -i "/const adminRouter =/a const teacherRouter = require(\"./routers/teacher_router.js\");" server.js
    sed -i "/app.use(\"\/api\/v1\/admin_route\", adminRouter);/a app.use(\"\/api\/v1\/teacher\", teacherRouter);" server.js
fi

echo "í¾Š Setup Complete!"
echo "í³š Run: node add_swagger_to_routers.js"
echo "íº€ Run: npm start"
