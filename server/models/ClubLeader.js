const mongoose = require('mongoose');

const clubLeaderSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  clubName: String,
  role: String,
  tier: {
    type: String,
    enum: ['Core', 'CR', 'ASC', 'SOH'],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('ClubLeader', clubLeaderSchema);
