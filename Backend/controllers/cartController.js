import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update cart
    const cart = user.cartData || {};
    cart[itemId] = (cart[itemId] || 0) + 1;

    user.cartData = cart;
    user.markModified("cartData"); // ✅ Important for nested object updates
    await user.save();

    res.json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    const user = await userModel.findById(userId);

    if (!user || !user.cartData[itemId]) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    delete user.cartData[itemId];
    user.markModified("cartData");
    await user.save();

    res.json({ success: true, message: "Item removed from cart", cart: user.cartData });
  } catch (error) {
    console.error("Remove from Cart Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cart: user.cartData || {} });
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addToCart, removeFromCart, getCart };
