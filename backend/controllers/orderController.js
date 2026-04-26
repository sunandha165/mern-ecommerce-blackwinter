import Order from "../models/Order.js";
import User from "../models/User.js";

/* ================= CREATE ORDER ================= */
export const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    // VALIDATION
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

    // CREATE ORDER ITEMS
    const items = user.cart.map((item) => ({
      product: item.product._id,
      qty: item.qty,
      price: item.product.price,
    }));

    // TOTAL PRICE
    const totalPrice = items.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );

    // CREATE ORDER
    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      totalPrice,
      paymentMethod: "COD",
      isPaid: false,
      status: "Pending",
    });

    await order.save();

    // CLEAR CART
    user.cart = [];
    await user.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

/* ================= GET ALL ORDERS (ADMIN) ================= */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name image price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/* ================= UPDATE ORDER STATUS (ADMIN) ================= */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;

    // OPTIONAL: mark paid
    if (status === "Paid") {
      order.isPaid = true;
    }

    await order.save();

    res.json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);
    res.status(500).json({ message: "Update failed" });
  }
};