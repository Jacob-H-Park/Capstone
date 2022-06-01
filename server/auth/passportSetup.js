const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require("dotenv").config();

const {
  models: { User },
} = require("../db");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const { id, emails, displayName, photos } = profile;

      if (emails) {
        const email = emails[0].value;
        const avatar = photos[0].value;
        const username = displayName;
        // check if user already exists in our db
        const user = await User.findOne({ where: { username } });
        if (user) {
          // already has the user, pass the user to browser cookies
          return done(null, user);
        } else {
          // if not, create user in our db
          const newUser = await User.create({
            email,
            username,
            password: id,
            // photo: avatar,
          });
          return done(null, newUser);
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
