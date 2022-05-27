const Sequelize = require("sequelize");
const { STRING } = Sequelize;
const db = require("../db");

const Restaurant = db.define("restaurant", {
  name: {
    type: STRING,
  },
});

module.exports = Restaurant;
