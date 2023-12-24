const express = require("express");
const router = express.Router();
const Post = require("../models/Post");


/**
 * GET /
 * Admin -- Login
 */

router.get("/admin", async (req, res) => {
  
  try {
    const locals = {
        title: "Admin",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
    

    const data = await Post.find();
    res.render('admin/index', { locals});
  } catch (error) {
    console.log(error);
  }

});





module.exports = router;



// router.get("", async (req, res) => {
//   const locals = {
//     title: "NodeJs Blog",
//     description: "Simple Blog created with NodeJs, Express & MongoDb."
//   }

//   try {
//     const data = await Post.find();
//     res.render('index', { locals, data });
//   } catch (error) {
//     console.log(error);
//   }

// });