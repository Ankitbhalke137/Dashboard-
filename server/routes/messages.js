const express = require('express');
const Message = require('../models/Message');
const ChatRoom = require('../models/ChatRoom');

const router = express.Router();

router.get('/conversations/:studentId', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.params.studentId },
        { receiver: req.params.studentId },
      ],
    })
      .populate('sender', 'name avatar')
      .populate('receiver', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/rooms', async (req, res) => {
  try {
    const rooms = await ChatRoom.find({ type: 'public' });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
