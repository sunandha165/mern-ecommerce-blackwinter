import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

/* ============ CREATE RAZORPAY ORDER ============ */
export const createRazorpayOrder = async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.product");

  if (!user || user.cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const amount = user.cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const razorpayOrder = await razorpay.orders.create({
    amount: amount * 100, // paise
    currency: "INR",
    receipt: `rcpt_${Date.now()}`,
  });

  res.json(razorpayOrder);
};

/* ============ VERIFY PAYMENT & CREATE ORDER ============ */
export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    shippingAddress,
  } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSign !== razorpay_signature) {
    return res.status(400).json({ message: "Payment verification failed" });
  }

  const user = await User.findById(req.user._id).populate("cart.product");

  const orderItems = user.cart.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: user._id,
    orderItems,
    shippingAddress,
    totalPrice,
    paymentMethod: "ONLINE",
    paymentStatus: "PAID",
  });

  user.cart = [];
  await user.save();

  res.json(order);
};
