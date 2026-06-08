const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  logo: String,
  coverImage: String,
  presidentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
  images: [String],
  category: {
    type: String,
    enum: ['Tech', 'Cultural', 'Sports', 'Social Welfare', 'Business', 'Robotics', 'Content'],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);
