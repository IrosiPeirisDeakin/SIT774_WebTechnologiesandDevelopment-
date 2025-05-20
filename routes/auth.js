// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database
const db = new sqlite3.Database(path.join(__dirname, '../users.db'), (err) => {
  if (err) return console.error('❌ SQLite connection error:', err);
  console.log('✅ Connected to SQLite (users.db)');
});

// Create users table if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)`);

// GET login page
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// POST login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) return res.render('login', { error: 'Database error' });
    if (!user) return res.render('login', { error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.render('login', { error: 'Invalid credentials' });

    req.session.userId = user.id;
    res.redirect('/dashboard');
  });
});

// GET logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Dummy registration route for testing (optional)
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed], (err) => {
    if (err) return res.send('Error registering user');
    res.redirect('/login');
  });
});

module.exports = router;
