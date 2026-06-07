const express = require('express');
const LeaderboardEntry = require('../models/LeaderboardEntry');

const router = express.Router();

router.get('/:category', async (req, res) => {
  try {
    const entries = await LeaderboardEntry.find({ category: req.params.category })
      .populate('studentId', 'name avatar batch')
      .sort({ score: -1 })
      .limit(20);
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
