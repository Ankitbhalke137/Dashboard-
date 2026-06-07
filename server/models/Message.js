const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  roomId: String,
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
