// app.js

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const path = require('path');
const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session management using SQLite
app.use(session({
  store: new SQLiteStore({ db: 'sessions.sqlite' }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 } // 1 hour
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const tutorialRoutes = require('./routes/tutorial');

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/tutorial', tutorialRoutes);

// Error handler for unmatched routes
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
