import User from "../models/User.js";

/* ================= ADD TO CART ================= */
export const addToCart = async (req, res) => {
  const { productId, qty } = req.body;

  const user = await User.findById(req.user.id);

  const existingItem = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    user.cart.push({
      product: productId,
      qty,
    });
  }

  await user.save();

  const updatedUser = await User.findById(req.user.id)
    .populate("cart.product");

  res.json(updatedUser.cart);
};

/* ================= GET CART ================= */
export const getCart = async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate("cart.product");

  res.json(user.cart);
};

/* ================= REMOVE FROM CART ================= */
export const removeFromCart = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.cart = user.cart.filter(
    (item) => item._id.toString() !== req.params.id
  );

  await user.save();

  const updatedUser = await User.findById(req.user.id)
    .populate("cart.product");

  res.json(updatedUser.cart);
};

/* ================= UPDATE QTY ================= */
export const updateCartQty = async (req, res) => {
  const { qty } = req.body;

  const user = await User.findById(req.user.id);

  const item = user.cart.find(
    (i) => i._id.toString() === req.params.id
  );

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  item.qty = qty;

  await user.save();

  const updatedUser = await User.findById(req.user.id)
    .populate("cart.product");

  res.json(updatedUser.cart);
};
