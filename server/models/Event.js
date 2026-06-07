const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  type: {
    type: String,
    enum: ['upcoming', 'past'],
    required: true,
  },
  registrationLink: String,
  images: [String],
  organizedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
  },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
