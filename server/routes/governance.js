const express = require('express');
const ClubLeader = require('../models/ClubLeader');
const AcademicTopper = require('../models/AcademicTopper');

const router = express.Router();

router.get('/leaders', async (req, res) => {
  try {
    const { tier } = req.query;
    const filter = {};
    if (tier) filter.tier = tier;
    const leaders = await ClubLeader.find(filter).populate('studentId');
    res.json(leaders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/toppers', async (req, res) => {
  try {
    const toppers = await AcademicTopper.find().populate('studentId').sort({ cgpa: -1 });
    res.json(toppers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
