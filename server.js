require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jobRoutes = require('./routes/jobRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/jobs', jobRoutes);
app.use('/applicants', applicantRoutes);


console.log('Connecting to MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('MongoDB connection error:', err));
