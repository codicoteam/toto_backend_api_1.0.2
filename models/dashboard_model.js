// dashboard Model
const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  // Add your schema fields here
  name: { type: String },
  description: { type: String },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Dashboard', dashboardSchema);
