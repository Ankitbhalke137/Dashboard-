const mongoose = require('mongoose');

const leaderboardEntrySchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  category: {
    type: String,
    enum: ['coding', 'problem_solving', 'sports'],
    required: true,
  },
  score: { type: Number, required: true, default: 0 },
  rank: Number,
  metadata: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

leaderboardEntrySchema.index({ category: 1, score: -1 });
leaderboardEntrySchema.index({ studentId: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
