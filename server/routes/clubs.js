const express = require('express');
const Club = require('../models/Club');
const auth = require('../middleware/auth');
const { rbac, clubPresidentAccess } = require('../middleware/rbac');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find().populate('presidentId', 'name avatar');
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .populate('presidentId')
      .populate('members');
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.json(club);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:clubId/images', auth, clubPresidentAccess, async (req, res) => {
  try {
    const { images } = req.body;
    const club = await Club.findByIdAndUpdate(
      req.params.clubId,
      { $push: { images: { $each: images } } },
      { new: true }
    );
    res.json(club);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:clubId/images/:index', auth, clubPresidentAccess, async (req, res) => {
  try {
    const club = await Club.findById(req.params.clubId);
    club.images.splice(parseInt(req.params.index), 1);
    await club.save();
    res.json(club);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
