// end_lesson_question Model
const mongoose = require('mongoose');

const end_lesson_questionSchema = new mongoose.Schema({
  // Basic fields
  name: { type: String },
  description: { type: String },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('End_lesson_question', end_lesson_questionSchema);
