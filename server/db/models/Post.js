const db = require("../db")

const {STRING, Sequelize} = require("sequelize")

const Post = db.define("post", {
  review: {
    type: STRING   
  },
  location: {
    type: STRING 
  },
  title: {
    type: STRING  
  },
  wifi: {
    type: Sequelize.ENUM('Free-Wifi', 'Wifi Not Available', 'Wifi Costs Extra', ""),
    defaultValue: "Wifi Not Available"
  }
})

module.exports = Post