const db = require("../db");

const { STRING, Sequelize } = db.Sequelize;

const Post = db.define("post", {
  review: {
    type: STRING,
  },
  location: {
    type: STRING,
  },
  title: {
    type: STRING,
  },
  wifi: {
    type: Sequelize.ENUM("Free-Wifi", "Wifi Not Available", "Wifi Costs Extra"),
    defaultValue: "Wifi Not Available",
  },
  restaurantName: {
    type: STRING
  }
});

module.exports = Post;
