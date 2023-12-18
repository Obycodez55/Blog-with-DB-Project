const express = require("express");

const router = express.Router();

// Routes
router.get("/", (req, res) =>{
    const local = {
        title: "NodeJs Blog",
        description: "Simple Blog made with NodeJs, Express, EJS and MongoDB" 
    }

    res.render("index", local);
});

router.get("/about", (req, res) => {
    const local = {
        title: "NodeJs Blog | About",
        description: "Learn about the Simple Blog made with NodeJs, Express, EJS and MongoDB" 
    }
    res.render("about", local)
})

module.exports = router;
