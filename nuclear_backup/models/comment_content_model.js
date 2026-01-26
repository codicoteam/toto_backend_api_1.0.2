// comment_content Model
const mongoose = require('mongoose');

const comment_contentSchema = new mongoose.Schema({
  // Add your schema fields here
  name: { type: String },
  description: { type: String },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Comment_content', comment_contentSchema);
