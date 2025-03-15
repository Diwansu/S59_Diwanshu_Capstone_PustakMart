const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// Add book - Admin only
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.authClaims.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });

    await book.save();

    return res.status(200).json({
      message: "Book added successfully!",
      book,
    });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update book - Admin only
router.put("/update-book/:bookId", authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.authClaims.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const { bookId } = req.params;
    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required." });
    }

    const bookExists = await Book.findById(bookId);
    if (!bookExists) {
      return res.status(404).json({ message: "Book not found." });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        language: req.body.language,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Book updated successfully!",
      updatedBook,
    });
  } catch (error) {
    console.error("Error details:", error);
    return res.status(500).json({ message: "An error occurred." });
  }
});

// Delete book - Admin only
router.delete("/delete-book/:bookId", authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.authClaims.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const { bookId } = req.params;

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required." });
    }
    const bookExists = await Book.findById(bookId);

    if (!bookExists) {
      return res.status(404).json({ message: "Book not found." });
    }

    await Book.findByIdAndDelete(bookId);

    return res.status(200).json({
      message: "Book deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred while deleting." });
  }
});

// Public routes - no authentication needed
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred." });
  }
});

router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    return res.json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred." });
  }
});

module.exports = router;
