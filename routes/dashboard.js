// routes/dashboard.js

const express = require('express');
const router = express.Router();

// Middleware to protect routes
function ensureAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// GET dashboard
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('dashboard');
});

module.exports = router;
