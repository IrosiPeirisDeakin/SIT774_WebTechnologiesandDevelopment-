// Handles user data access using SQLite

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../users.db'), (err) => {
  if (err) {
    console.error('❌ Failed to connect to SQLite DB:', err);
  } else {
    console.log('✅ User model connected to SQLite');
  }
});

// Create table if it doesn't exist
const init = () => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);
};

const getUserByUsername = (username, callback) => {
  db.get('SELECT * FROM users WHERE username = ?', [username], callback);
};

const createUser = (username, hashedPassword, callback) => {
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], callback);
};

module.exports = {
  init,
  getUserByUsername,
  createUser
};