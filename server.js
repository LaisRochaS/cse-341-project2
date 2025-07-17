require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const jobRoutes = require('./routes/jobRoutes');
const applicantRoutes = require('./routes/applicantRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/jobs', jobRoutes);
app.use('/applicants', applicantRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
