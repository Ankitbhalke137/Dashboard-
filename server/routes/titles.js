const express = require('express');
const Title = require('../models/Title');
const StudentTitle = require('../models/StudentTitle');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const titles = await Title.find();
    res.json(titles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/student/:studentId', async (req, res) => {
  try {
    const studentTitles = await StudentTitle.find({ studentId: req.params.studentId })
      .populate('titleId');
    res.json(studentTitles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
