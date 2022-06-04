const db = require("../db")

const {STRING} = require("sequelize")

const Post = db.define("post", {
  textpost: {
    type: STRING   
  },
  location: {
    type: STRING 
  },
  title: {
    type: STRING  
  }
})

module.exports = Post