const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('./models/User'); // Adjust the path to your User model
require('dotenv').config();

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists in our db
        let existingUser  = await User.findOne({ githubId: profile.id });
        if (existingUser ) {
            return done(null, existingUser );
        }
        // If not, create a new user in our db
        const newUser  = await new User({
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            profileImage: profile._json.avatar_url,
        }).save();
        done(null, newUser );
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser ((user, done) => {
    done(null, user.id);
});

passport.deserializeUser ((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
