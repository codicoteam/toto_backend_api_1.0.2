// email Model
const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  // Basic fields
  title: { type: String },
  description: { type: String },
  data: { type: mongoose.Schema.Types.Mixed },
  status: { type: String, default: 'active' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Add indexes if needed
emailSchema.index({ createdAt: -1 });
emailSchema.index({ status: 1 });

module.exports = mongoose.model('Email', emailSchema);
