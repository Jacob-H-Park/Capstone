const GoogleStrategy = require("passport-google-oauth20").Strategy;

const passport = require("passport");

const GOOGLE_CLIENT_ID =
  "347951385084-iense89u3v0t8u6j4vlskn7kjmoksm4l.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
