const express = require('express');
const Faculty = require('../models/Faculty');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { department } = req.query;
    const filter = {};
    if (department) filter.department = department;
    const faculty = await Faculty.find(filter);
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
