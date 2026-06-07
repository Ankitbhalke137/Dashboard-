const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  avatar: String,
  batch: String,
  campus: String,
  about: String,
  github: String,
  linkedin: String,
  portfolio: String,
  isLeapxIntern: { type: Boolean, default: false },
  resumeData: {
    skills: [String],
    projects: [{
      title: String,
      description: String,
      techStack: [String],
      link: String,
    }],
    achievements: [String],
    education: {
      degree: String,
      institution: String,
      year: String,
    },
  },
  techStack: [String],
  titles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Title',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
