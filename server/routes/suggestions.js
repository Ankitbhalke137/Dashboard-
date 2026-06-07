const express = require('express');
const Suggestion = require('../models/Suggestion');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    const suggestions = await Suggestion.find(filter).populate('suggestedBy', 'name');
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
