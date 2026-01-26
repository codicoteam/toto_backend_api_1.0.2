const teacherModel = require("../models/teacher_model.js");
const teacherModel = require("bcryptjs");
const teacherModel = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const OMIT_FIELDS = "-password -__v";

// Helper functions
const toE164 = (num) => {
  return num.startsWith("+") ? num : `+${num.replace(/[^\d]/g, "")}`;
};

// Create a new teacher
const createTeacher = async (teacherData) => {
  const existingTeacher = await Teacher.findOne({ email: teacherData.email });
  if (existingTeacher) throw new Error("Email already exists");

  const newTeacher = new Teacher(teacherData);
  const saved = await newTeacher.save();
  return await Teacher.findById(saved._id).select(OMIT_FIELDS);
};

// Get all teachers
const getAllTeachers = async (filters = {}) => {
  const query = {};
  if (filters.isActive !== undefined) query.isActive = filters.isActive;
  if (filters.specialization) query.specialization = { $in: filters.specialization };
  
  return Teacher.find(query)
    .select(OMIT_FIELDS)
    .populate('contentCount')
    .sort({ createdAt: -1 });
};

// Get teacher by ID
const getTeacherById = async (id) => {
  const teacher = await Teacher.findById(id)
    .select(OMIT_FIELDS)
    .populate('contentCount');
  if (!teacher) throw new Error("Teacher not found");
  return teacher;
};

// Get teacher by email
const getTeacherByEmail = async (email) => {
  return Teacher.findOne({ email }).select(OMIT_FIELDS);
};

// Get teacher with password for auth
const getTeacherForAuth = async (email) => {
  return Teacher.findOne({ email });
};

// Update teacher
const updateTeacher = async (id, updateData, currentUser) => {
  // If not admin, can only update own profile
  if (currentUser.role !== 'admin' && currentUser.id !== id) {
    throw new Error("You can only update your own profile");
  }
  
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 12);
  }
  
  const updated = await Teacher.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select(OMIT_FIELDS);
  
  if (!updated) throw new Error("Teacher not found");
  return updated;
};

// Delete teacher (soft delete)
const deleteTeacher = async (id) => {
  const deleted = await Teacher.findByIdAndUpdate(
    id, 
    { isActive: false }, 
    { new: true }
  ).select(OMIT_FIELDS);
  
  if (!deleted) throw new Error("Teacher not found");
  return deleted;
};

// Activate teacher
const activateTeacher = async (id) => {
  const activated = await Teacher.findByIdAndUpdate(
    id, 
    { isActive: true }, 
    { new: true }
  ).select(OMIT_FIELDS);
  
  if (!activated) throw new Error("Teacher not found");
  return activated;
};

// Password reset functions
const generateAndSendPasswordResetOTP = async (email) => {
  const teacher = await Teacher.findOne({ email, isActive: true });
  if (!teacher) throw new Error("Teacher not found or inactive");

  const to = toE164(teacher.contactNumber);

  await twilioClient.verify.v2
    .services(process.env.TWILIO_VERIFY_SERVICE_ID)
    .verifications.create({ to, channel: "sms" });

  teacher.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);
  teacher.resetPasswordVerifiedAt = undefined;
  await teacher.save();

  return { success: true, message: "Password reset OTP sent to your phone number" };
};

const verifyPasswordResetOTP = async (email, otpCode) => {
  const teacher = await Teacher.findOne({
    email,
    isActive: true,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!teacher) throw new Error("OTP expired or invalid request");

  const to = toE164(teacher.contactNumber);

  const verificationCheck = await twilioClient.verify.v2
    .services(process.env.TWILIO_VERIFY_SERVICE_ID)
    .verificationChecks.create({ to, code: otpCode });

  if (verificationCheck.status !== "approved") {
    throw new Error("Invalid OTP code");
  }

  teacher.resetPasswordVerifiedAt = new Date();
  await teacher.save();

  return { success: true, message: "OTP verified successfully" };
};

const resetPassword = async (email, newPassword) => {
  const teacher = await Teacher.findOne({
    email,
    isActive: true,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!teacher) throw new Error("OTP expired or invalid request");

  if (!teacher.resetPasswordVerifiedAt) {
    throw new Error("OTP not verified");
  }

  teacher.password = await bcrypt.hash(newPassword, 12);
  teacher.resetPasswordExpires = undefined;
  teacher.resetPasswordVerifiedAt = undefined;

  await teacher.save();
  return { success: true, message: "Password reset successfully" };
};

// Get teacher statistics
const getTeacherStats = async (teacherId) => {
  const teacher = await Teacher.findById(teacherId)
    .select(OMIT_FIELDS)
    .populate('contentCount');
    
  if (!teacher) throw new Error("Teacher not found");
  
  // Get stats from other services
  const stats = {
    teacher,
    contentCount: teacher.contentCount || 0,
    // These will be populated when we update other models
    examCount: 0,
    bookCount: 0,
    totalRevenue: 0
  };
  
  return stats;
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  getTeacherByEmail,
  getTeacherForAuth,
  updateTeacher,
  deleteTeacher,
  activateTeacher,
  generateAndSendPasswordResetOTP,
  verifyPasswordResetOTP,
  resetPassword,
  getTeacherStats
};