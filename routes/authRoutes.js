const express = require('express');
const passport = require('passport');
const router = express.Router();

// Auth with GitHub
router.get('/github', passport.authenticate('github'));

// Callback route for GitHub to redirect to
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    // Successful authentication, redirect home or to a protected route.
    res.redirect('/'); // Change this to your desired route
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Get current user
router.get('/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;
