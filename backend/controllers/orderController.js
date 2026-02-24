import Order from "../models/Order.js";
import User from "../models/User.js";

export const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    // 🔴 HARD VALIDATION (IMPORTANT)
    if (
      !shippingAddress ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      return res.status(400).json({
        message: "All shipping address fields are required",
      });
    }

    const user = await User.findById(req.user._id).populate("cart.product");

    if (!user || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = user.cart.map((item) => ({
      product: item.product._id,
      qty: item.qty,
      price: item.product.price,
    }));

    const totalPrice = items.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );

    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      totalPrice,
      paymentMethod: "COD",
      isPaid: false,
    });

    await order.save();

    user.cart = [];
    await user.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order creation failed" });
  }
};
