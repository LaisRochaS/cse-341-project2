require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

// Passport config
require('./auth/passport');

const app = express();

//  CORS middleware
app.use(cors({
  origin: 'https://cse-341-project2-9u89.onrender.com',
  credentials: true
}));

app.use(express.json());

//  Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//  Routes
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const authRoutes = require('./routes/authRoutes');
const ensureAuthenticated = require('./middleware/auth');

app.use('/', authRoutes);
app.use('/api/books', ensureAuthenticated, bookRoutes);
app.use('/api/authors', ensureAuthenticated, authorRoutes);

//  MongoDB + Start server
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  }))
  .catch(err => console.error(' MongoDB connection error:', err));
