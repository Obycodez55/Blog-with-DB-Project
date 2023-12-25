const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware =require("../../middlewares/authMiddleware");

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;


/**
 *
 * Guard Login
 */
// const authMiddleware = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json( { message: "Unauthorized" } );
//   }

//   try {
//     const decoded = jwt.verify(token, jwtSecret);
//     req.userId = decoded.userId;
//     next();
//   } catch(error){
//     res.status(401).json( { message: "Unauthorized" } );
//   }
// }



/**
 * GET /
 * Admin -- Login
 */

router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin Page",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };

    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST /
 * Admin --Check Login
 */

router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid Credientials" });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credientials" });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Admin Dashboard
 */

router.get("/dashboard", authMiddleware , async (req, res) => {


  try {
    const locals = {
      title: "Admin || Dashboard",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };


    const data = await Post.find();
    res.render("admin/dashboard", {locals, data});
  } catch (error) {
    
  }



 

});

/**
 * POST /
 * Admin --Register
 */

// router.post("/register", async (req, res) => {

//   try {

//     const {username, password} = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10)

//     try {
//       const user = await User.create({username, password:hashedPassword});
//       res.status(201).json({message: "User created successfully", user})
//       console.log(user);
//     } catch (error) {
//       if (error.code === 11000){
//         res.status(409).json({message: "User Already in use"});
//       }
//       res.status(500).json({message: "Internal server error"});
//     }

//   } catch (error) {
//     console.log(error);
//   }

// });

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
