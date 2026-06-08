const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    const books = await Book.find(filter).populate('suggestedBy', 'name');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
