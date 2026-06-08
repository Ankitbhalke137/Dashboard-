const mongoose = require('mongoose');

const titleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  icon: { type: String, required: true },
  description: String,
  criteria: String,
  category: {
    type: String,
    enum: ['coding', 'sports', 'academic', 'leadership', 'cultural', 'special'],
    default: 'special',
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common',
  },
}, { timestamps: true });

module.exports = mongoose.model('Title', titleSchema);
