const mongoose = require('mongoose');

const studentTitleSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  titleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Title',
    required: true,
  },
  earnedDate: { type: Date, default: Date.now },
  awardedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

studentTitleSchema.index({ studentId: 1, titleId: 1 }, { unique: true });

module.exports = mongoose.model('StudentTitle', studentTitleSchema);
