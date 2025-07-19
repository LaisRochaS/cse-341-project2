require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const db = require('./data/database');
const jobRoutes = require('./routes/jobRoutes');
const applicantRoutes = require('./routes/applicantRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(bodyParser.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/jobs', jobRoutes);
app.use('/applicants', applicantRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Job Applicants API. Visit /api-docs for Swagger documentation.',
  });
});

// Start server
db.initDb((err) => {
  if (err) {
    console.error('❌ Failed to connect to database:', err);
  } else {
    app.listen(port, () => {
      console.log(`✅ Server is running on http://localhost:${port}`);
      console.log(`📄 Swagger docs at http://localhost:${port}/api-docs`);
    });
  }
});
