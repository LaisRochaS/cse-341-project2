const express = require('express');
const passport = require('passport');
const router = express.Router();
const ensureAuthenticated = require('../middleware/auth');

// Start GitHub OAuth
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => res.redirect('/profile')
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});

// Protected profile route
router.get('/profile', ensureAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
