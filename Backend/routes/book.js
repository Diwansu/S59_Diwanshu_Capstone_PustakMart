const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const book = new Book ({
      url : req.body.url,
      title: req.body.title,
      author : req.body.author,
      price : req.body.price,
      desc : req.body.desc,
      language : req.body.language,
    })

    await book.save();
    
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
