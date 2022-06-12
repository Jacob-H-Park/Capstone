const db = require("../db");

const { STRING, INTEGER, Sequelize } = db.Sequelize;

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
<<<<<<< HEAD
    type: Sequelize.ENUM('Free-Wifi', 'Wifi Not Available', 'Wifi Costs Extra', ""),
    defaultValue: "Wifi Not Available"
  }
})
=======
    type: Sequelize.ENUM("Free-Wifi", "Wifi Not Available", "Wifi Costs Extra"),
  },
});
>>>>>>> 782fb0e (landing video and logo added, signup and login setup & style, routing changed to grant access to those who are logged in)

module.exports = Post;
