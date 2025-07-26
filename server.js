const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

// Routes & middleware
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const errorHandler = require('./middleware/errorHandler');
require('./auth/passport.js'); // for OAuth

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);


// OAuth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('/api/protected')
);

app.get('/api/protected', require('./middleware/isAuthenticated'), (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

