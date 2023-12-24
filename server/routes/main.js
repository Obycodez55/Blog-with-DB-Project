const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

/**
 * GET /
 * HOME
 */
router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog made with NodeJs, Express, EJS and MongoDB"
    };

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * ABOUT
 */

router.get("/about", (req, res) => {
  const local = {
    title: "NodeJs Blog | About",
    description:
      "Learn about the Simple Blog made with NodeJs, Express, EJS and MongoDB"
  };
  res.render("about", local);
});

/**
 * GET /
 * Post : ID
 */
router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Simple Blog made with NodeJs, Express, EJS and MongoDB"
    };

    res.render("post", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST /
 * Post : Search term
 */

router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog made with NodeJs, Express, EJS and MongoDB"
    };

    let searchTerm = req.body.searchTerm;

    console.log(searchTerm);

    // const data = await Post.findById({ _id: slug});

    res.send(searchTerm);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;