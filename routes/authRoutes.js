const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Login successful
    res.redirect('/dashboard'); 
  });

module.exports = router;
