// subject Model
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  // Basic fields
  name: { type: String },
  description: { type: String },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
