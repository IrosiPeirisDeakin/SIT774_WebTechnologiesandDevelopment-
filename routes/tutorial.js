// routes/tutorial.js

const express = require('express');
const router = express.Router();

// Serve the tutorial page
router.get('/', (req, res) => {
  res.render('tutorial');
});

module.exports = router;