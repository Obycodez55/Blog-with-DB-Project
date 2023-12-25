const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

const adminLayout = "../views/layouts/admin";
/**
 * GET /
 * Admin -- Login Page
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


/**
 * POST /
 * Admin --Register
 */

router.post("/register", async (req, res) => {
  
  try {
    
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    
    try {
      const user = await User.create({username, password:hashedPassword});
      res.status(201).json({message: "User created successfully", user})


    } catch (error) {
      if (error.code === 11000){
        res.status(409).json({message: "User Already in use"});
      }
      res.status(500).json({message: "Internal server error"});
    }


   
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