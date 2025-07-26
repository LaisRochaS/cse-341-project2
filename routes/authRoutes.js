const express = require('express');
const passport = require('passport');
const router = express.Router();

// OAuth login
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// OAuth callback
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  });

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Protected profile route
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Unauthorized' });
}

router.get('/profile', ensureAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
