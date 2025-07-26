const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback', passport.authenticate('github', {
  failureRedirect: '/login-failure',
  successRedirect: '/login-success'
}));

router.get('/login-success', (req, res) => {
  res.json({ message: 'Login successful', user: req.user });
});

router.get('/login-failure', (req, res) => {
  res.status(401).json({ message: 'Login failed' });
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;
