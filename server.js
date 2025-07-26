require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors'); // ✅ Import CORS

require('./auth/passport');

const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const authRoutes = require('./routes/authRoutes');
const ensureAuthenticated = require('./middleware/auth');

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

const app = express();

// ✅ CORS Middleware
app.use(cors({
  origin: 'https://cse-341-project2-9u89.onrender.com/',
  credentials: true
}));

app.use(express.json());

// Session + Passport
app.use(session({
  secret: process.env.GITHUB_CLIENT_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Routes
app.use('/', authRoutes);
app.use('/api/books', ensureAuthenticated, bookRoutes);
app.use('/api/authors', ensureAuthenticated, authorRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(3000, () => console.log('✅ Server on http://localhost:3000')))
  .catch(err => console.error('❌ DB connection error:', err));
