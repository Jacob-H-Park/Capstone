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

router.get("/", token, async (req, res, next) => {
  try {
    res.send(await Post.findAll());
  } catch (ex) {
    next(ex);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    res.send(post);
  } catch (ex) {
    next(ex);
  }
});

router.post("/", token, async (req, res, next) => {
  try {
    const { review, restaurantName, title, wifi, userId } = req.body;
    const post = await Post.create({
      review,
      restaurantName,
      title,
      wifi,
      userId,
    });
    return res.json(post);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    console.log("this is req.body", req.body);
    const post = await Post.findByPk(req.params.id);
    if (post) {
      await post.destroy();
    } else {
      res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

router.put("/:postId", token, async (req, res, next) => {
  try {
    const { review, title, location, wifi } = req.body;
    const post = await Post.findByPk(req.params.postId);
    const updatedPost = await post.update({
      title,
      location,
      review,
      wifi,
    });
    return res.json(updatedPost);
  } catch (e) {
    next(e);
  }
});
