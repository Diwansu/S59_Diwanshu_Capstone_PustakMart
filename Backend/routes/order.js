const router = require("express").Router();
const Order = require("../models/order");
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// Place a new order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.authClaims.id;
    const { bookId } = req.body;

    const order = new Order({
      user: userId,
      book: bookId,
    });

    const savedOrder = await order.save();

    // Add order to user's orders array
    await User.findByIdAndUpdate(userId, {
      $push: { orders: savedOrder._id }
    });

    return res.status(200).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get user's orders
router.get("/my-orders", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.authClaims.id;
    const orders = await Order.find({ user: userId })
      .populate("book")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "Success",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get specific order details
router.get("/order/:orderId", authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.authClaims.id;

    const order = await Order.findById(orderId)
      .populate("book")
      .populate("user", "-password");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure user can only access their own orders
    if (order.user._id.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json({
      status: "Success",
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Admin route: Update order status
router.put("/update-status/:orderId", authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const user = req.user.authClaims;

    // Check if user is admin
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Validate status
    const validStatuses = ["Order Placed", "Out for delivery", "Delivered", "Canceled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("book").populate("user", "-password");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Cancel order (user can only cancel if order is not delivered)
router.put("/cancel-order/:orderId", authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.authClaims.id;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if order belongs to user
    if (order.user.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Check if order can be cancelled
    if (order.status === "Delivered") {
      return res.status(400).json({ message: "Cannot cancel delivered order" });
    }

    order.status = "Canceled";
    await order.save();

    return res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Admin route: Get all orders
router.get("/all-orders", authenticateToken, async (req, res) => {
  try {
    const user = req.user.authClaims;

    // Check if user is admin
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const orders = await Order.find()
      .populate("book")
      .populate("user", "-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "Success",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;