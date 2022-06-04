const { STRING, INTEGER, BOOLEAN} = require("sequelize");

const db = require("../db");

const Restaurant = db.define("restaurant", {
  name: {
    type: STRING,
  },
  address: {
    type: STRING,
  },
  category: {
    type: STRING
  },
  city: {
    type: STRING
  },
  state: {
    type: STRING
  },
  image: {
    type: STRING,
  },
  ranking: {
    type: INTEGER
  },
  isFavorite: {
    type: BOOLEAN
  }
});

module.exports = Restaurant;
