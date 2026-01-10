const express = require('express');
const router = express.Router();

// Import controllers (when created)
// const movieController = require('../controllers/movieController');

// Example route structure
router.get('/movies', (req, res) => {
  res.json({
    success: true,
    message: 'Movies endpoint - to be implemented',
    data: []
  });
});

router.get('/tv-shows', (req, res) => {
  res.json({
    success: true,
    message: 'TV shows endpoint - to be implemented',
    data: []
  });
});

router.get('/search', (req, res) => {
  const { query } = req.query;
  res.json({
    success: true,
    message: 'Search endpoint - to be implemented',
    query: query || '',
    data: []
  });
});

module.exports = router;
