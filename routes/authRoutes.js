// routes/auth.js
const express = require('express');
const passport = require('passport');

const router = express.Router();

// @desc    Auth with GitHub
// @route   GET /api/auth/github
router.get('/github', passport.authenticate('github'));

// @desc    GitHub auth callback
// @route   GET /api/auth/github/callback
router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/login',
}), (req, res) => {
    // Successful authentication, redirect home or send a token
    res.redirect('/'); // Redirect to your desired route
});

// @desc    Logout user
// @route   GET /api/auth/logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
