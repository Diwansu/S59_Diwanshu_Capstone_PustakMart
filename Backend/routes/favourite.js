const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

router.put(
  "/add-book-to-favourite/:bookId",
  authenticateToken,
  async (req, res) => {
    try {
      const { bookId } = req.params;
      const id = req.user.authClaims.id;

      const userData = await User.findById(id);
      const isBookFavourite = userData.favourites.includes(bookId);
      if (isBookFavourite) {
        return res
          .status(200)
          .json({ message: "Book is already in favourites." });
      }
      await User.findByIdAndUpdate(id, { $push: { favourites: bookId } });
      return res.status(200).json({ message: "Book added to favourites." });
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  }
);

router.put(
  "/remove-book-from-favourite/:bookId",
  authenticateToken,
  async (req, res) => {
    try {
      const { bookId } = req.params;
      const id = req.user.authClaims.id;

      await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });

      return res.status(200).json({ message: "Book removed from favourites." });
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  }
);

router.get("/get-favourite-books", authenticateToken, async (req, res) => {
  try {
    const id = req.user.authClaims.id;

    const userData = await User.findById(id).populate("favourites");
    const favouriteBooks = userData.favourites;
    return res.json({
      status: "Success",
      data: favouriteBooks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occured." });
  }
});

module.exports = router;
