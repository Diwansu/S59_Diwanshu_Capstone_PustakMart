const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookId} = req.body;
     const id = req.user.id

    const userData = await User.findById(id);

    if (!userData) {
      return res
        .status(401)
        .json({ message: "Please log in to use this feature." });
    }
    const isBookOnCart = userData.cart.includes(bookId);

    if (isBookOnCart) {
      return res.status(200).json({ message: "Book is already on Cart." });
    }

    await User.findByIdAndUpdate(
      id,
      { $push: { cart: bookId } },
      { new: true }
    );
    return res.status(200).json({ message: "Book is added to Cart." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured." });
  }
});

router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const  id  = req.user.id;

    await User.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });

    return res.json({
      status: "Success",
      message: "Book removed from cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error Occured" });
  }
});

router.get("get-user-cart", authenticateToken, async (req, res) => {
  try {
    const  id  = req.user.id;
    
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();

    return res.json({
      status: "Success",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error Occured." });
  }
});

module.exports = router;
