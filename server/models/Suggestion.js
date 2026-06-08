const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['project', 'career', 'internship', 'skill'],
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  link: String,
  tags: [String],
  suggestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
}, { timestamps: true });

module.exports = mongoose.model('Suggestion', suggestionSchema);
