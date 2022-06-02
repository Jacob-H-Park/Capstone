const router = require("express").Router();
const {
    models: { Post, User },

} = require("../db");
module.exports = router;

const token = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const user = await User.findByToken(token);
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  };

router.post("/", token, async (req ,res, next) => {
    try {
      const {textpost, location, title} = req.body
      const post = await Post.create({
         textpost,
         location,
         title
      })
      return res.json(post)
    } catch (e) {
      next (e)
    }
  })