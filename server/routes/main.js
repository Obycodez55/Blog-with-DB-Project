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

      const data = await Post.aggregate([ { $sort: {createdAt: -1} } ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

      const count = await Post.countDocuments({});
      const nextPage = parseInt(page) + 1;
      const hasNextPage = nextPage >= Math.ceil(count/ perPage);

      console.log(nextPage);
      console.log(hasNextPage);
      console.log(req.query);

    
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



router.get("/about", (req, res) => {
  const local = {
    title: "NodeJs Blog | About",
    description:
      "Learn about the Simple Blog made with NodeJs, Express, EJS and MongoDB"
  };
  res.render("about", local);
});

module.exports = router;
