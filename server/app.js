const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

//Google OAuth
const cookieSession = require("cookie-session");
const passportSetup = require("./auth/passportSetup");
const passport = require("passport");

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded());

app.use(
  cookieSession({
    name: "session",
    keys: ["LoopedIn!!"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static(path.join(__dirname, "../public")));

// auth and api routes
app.use("/auth-stream", require("./auth/stream"));
app.use("/auth", require("./auth"));

app.use("/google", require("./auth/googleOauth"));
app.use("/api", require("./api"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// sends index.html (redirects invalid urls to homepage)
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

module.exports = app;
