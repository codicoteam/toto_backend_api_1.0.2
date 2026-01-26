const fs = require('fs');

console.log('Updating teacher model...');

const modelContent = `const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    qualifications: {
      type: [String],
      default: [],
    },
    profile_pic_url: {
      type: String,
      default: "",
    },
    cover_photo_url: {
      type: String,
      default: "",
    },
    contactNumber: {
      type: String,
      default: "",
    },
    specialization: {
      type: [String],
      default: [],
    },
    experience_years: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "teacher",
      enum: ["teacher", "admin"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Remove duplicate indexes by not defining them here
// They should be defined in database or through mongoose once

module.exports = mongoose.model("Teacher", teacherSchema);
`;

fs.writeFileSync('./models/teacher_model.js', modelContent);
console.log('✅ Teacher model updated with new fields');
