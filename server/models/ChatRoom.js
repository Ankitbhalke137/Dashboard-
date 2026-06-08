const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
  description: String,
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
}, { timestamps: true });

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
