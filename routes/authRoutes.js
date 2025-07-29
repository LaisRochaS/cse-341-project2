   // routes/authRoutes.js
   const express = require('express');
   const User = require('../models/User'); // Adjust the path to your User model
   const bcrypt = require('bcryptjs');
   const router = express.Router();

   // Register route
   router.post('/register', async (req, res) => {
       const { username, password } = req.body;
       console.log("Request Body:", req.body); // Log the request body for debugging

       if (!username || !password) {
           return res.status(400).json({ message: 'Username and password are required' });
       }

       try {
           const hashedPassword = await bcrypt.hash(password, 10);
           const user = new User({ username, password: hashedPassword });
           await user.save();
           res.status(201).json({ message: 'User  registered successfully', user });
       } catch (error) {
           console.error("Error saving user:", error);
           res.status(500).json({ message: error.message });
       }
   });

   module.exports = router;
   