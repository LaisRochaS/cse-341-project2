   const mongoose = require('mongoose');
   require('dotenv').config();

   const initializeDb = (callback) => {
       mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
           .then(() => {
               console.log("Database connected successfully");
               callback(null);
           })
           .catch(err => {
               console.error("Database connection error:", err);
               callback(err);
           });
   };

   module.exports = { initializeDb };
   