//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Restaurant = require("./models/Restaurant");
const Post = require("./models/Post")

//associations could go here!

Post.belongsTo(User)
User.hasMany(Post)


module.exports = {
  db,
  models: {
    User,
    Restaurant,
    Post
  },
};
