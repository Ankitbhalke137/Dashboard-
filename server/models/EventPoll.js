const mongoose = require('mongoose');

const eventPollSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  question: { type: String, required: true },
  options: [{
    text: String,
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  expiresAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('EventPoll', eventPollSchema);
