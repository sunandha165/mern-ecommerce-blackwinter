import User from "../models/User.js";

/* ================= ADD TO WISHLIST ================= */
export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.wishlist.includes(req.params.productId)) {
      user.wishlist.push(req.params.productId);
      await user.save();
    }

    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: "Wishlist add failed" });
  }
};

/* ================= GET WISHLIST ================= */
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("wishlist");

    res.json(user.wishlist || []);
  } catch (error) {
    console.error("Wishlist fetch error:", error);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

/* ================= REMOVE FROM WISHLIST ================= */
export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.productId
    );

    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: "Wishlist remove failed" });
  }
};
