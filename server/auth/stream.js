const router = require("express").Router();
const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");
require("dotenv").config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

//auth-stream/signup
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    //create encrypted id and password for new user
    const userId = crypto.randomBytes(16).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);

    //set up a serverClient to create a user token to send to the frontend so that it can be saved in the cookies.
    const serverClient = connect(api_key, api_secret, app_id);
    const token = serverClient.createUserToken(userId);

    //set up a client with Stream to seed a new user in their backend.
    const client = StreamChat.getInstance(api_key, api_secret);
    client.upsertUser({
      id: userId,
      name: username,
      hashedPassword,
      role: "user",
    });
    await client.updateAppSettings({
      enforce_unique_usernames: "app",
    });

    res.status(200).json({ token, username, userId, hashedPassword });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

//auth-stream/login
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const client = StreamChat.getInstance(api_key, api_secret);
    const { users } = await client.queryUsers({ name: username });

    const serverClient = connect(api_key, api_secret, app_id);
    const token = serverClient.createUserToken(users[0].id);

    if (!users.length)
      return res.status(400).json({ message: "User not found" });

    const success = bcrypt.compare(password, users[0].hashedPassword);

    if (success) {
      res.status(200).json({
        token,
        username,
        userId: users[0].id,
      });
    } else {
      res.status(500).json({ message: "Incorrect password" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
