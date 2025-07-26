const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('./models/User'); // Your user model

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback'
},
async (accessToken, refreshToken, profile, done) => {
  // Find or create user in your DB here
  let user = await User.findOne({ githubId: profile.id });
  if (!user) {
    user = await User.create({ githubId: profile.id, username: profile.username });
  }
  return done(null, user);
}));

