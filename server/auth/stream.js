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

    const userId = crypto.randomBytes(16).toString("hex");

    const serverClient = connect(api_key, api_secret, app_id);

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = serverClient.createUserToken(userId);

    const newUser = await serverClient.upsertUser([
      { id: "whatever01931", role: "user", name: username },
    ]);
    console.log("newUser", newUser);

    res.status(200).json({ token, newUser, username, userId, hashedPassword });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

//auth-stream/login
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const serverClient = connect(api_key, api_secret, app_id);
    const client = StreamChat.getInstance(api_key, api_secret);

    const { users } = await client.queryUsers({ name: username });

    if (!users.length)
      return res.status(400).json({ message: "User not found" });

    const success = bcrypt.compare(password, users[0].hashedPassword);

    const token = serverClient.createUserToken(users[0].id);

    if (success) {
      res.status(200).json({
        token,
        fullName: users[0].fullName,
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
