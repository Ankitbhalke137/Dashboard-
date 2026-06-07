const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  cover: String,
  description: String,
  category: {
    type: String,
    enum: ['programming', 'dsa', 'web', 'ml', 'career', 'soft-skills', 'other'],
    default: 'other',
  },
  suggestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  link: String,
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
