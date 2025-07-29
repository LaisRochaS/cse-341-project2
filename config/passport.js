const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User'); 

module.exports = function(passport) {
    passport.use(new GitHubStrategy({
        clientID: 'YOUR_GITHUB_CLIENT_ID',
        clientSecret: 'YOUR_GITHUB_CLIENT_SECRET',
        callbackURL: '/api/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists in the database
            let user = await User.findOne({ githubId: profile.id });
            if (user) {
                return done(null, user);
            }

            // If not, create a new user
            user = await new User({
                githubId: profile.id,
                username: profile.username,
                thumbnail: profile._json.avatar_url,
            }).save();
            done(null, user);
        } catch (err) {
            console.error(err);
            done(err, null);
        }
    }));

    passport.serializeUser ((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser ((id, done) => {
        User.findById(id)
            .then(user => {
                done(null, user);
            });
    });
};
