const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: String,
  department: String,
  email: String,
  officeHours: String,
  avatar: String,
}, { timestamps: true });

module.exports = mongoose.model('Faculty', facultySchema);
