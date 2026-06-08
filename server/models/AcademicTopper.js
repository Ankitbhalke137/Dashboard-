const mongoose = require('mongoose');

const academicTopperSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  semester: { type: Number, required: true },
  cgpa: { type: Number, required: true },
  department: String,
}, { timestamps: true });

module.exports = mongoose.model('AcademicTopper', academicTopperSchema);
