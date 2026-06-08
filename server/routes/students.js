const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { location, batch, isLeapxIntern, search } = req.query;
    const filter = {};
    if (location) filter.location = location;
    if (batch) filter.batch = batch;
    if (isLeapxIntern === 'true') filter.isLeapxIntern = true;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const students = await Student.find(filter).populate('titles');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('titles');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
