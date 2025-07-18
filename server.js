require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const db = require('./data/database');
const jobRoutes = require('./routes/jobRoutes');
const applicantRoutes = require('./routes/applicantRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Swagger UI available at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use('/jobs', jobRoutes);
app.use('/applicants', applicantRoutes);

// Optional: root route with welcome message
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Job Applicants API. Visit /api-docs for Swagger documentation.'
  });
});

// Initialize database and start server
db.initDb((err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
  } else {
    app.listen(port, () => {
      console.log(`✅ Server is running on https://localhost:${port}`);
      console.log(`📄 Swagger docs at https://localhost:${port}/api-docs`);
    });
  }
});
