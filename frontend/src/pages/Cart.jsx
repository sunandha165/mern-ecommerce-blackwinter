import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  /* ================= FETCH CART ================= */
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(res.data || []);
    } catch (err) {
      console.error("Error loading cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  /* ================= UPDATE QTY ================= */
  const updateQty = async (itemId, newQty) => {
    if (newQty < 1) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/cart/${itemId}`,
        { qty: newQty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(res.data);
    } catch (err) {
      console.error("Qty update failed");
    }
  };

  /* ================= REMOVE ITEM ================= */
  const removeItem = async (itemId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(res.data);
    } catch (err) {
      console.error("Remove failed");
    }
  };

  /* ================= TOTAL ================= */
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  return (
    <>
      <Navbar />

      <section className="cart-page">
        <h1 className="cart-title">Your Cart</h1>

        {cart.length === 0 ? (
          <p style={{ textAlign: "center" }}>Cart is empty</p>
        ) : (
          <div className="cart-container">
            {/* LEFT - CART ITEMS */}
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img
                    src={`http://localhost:5000${
                      item.product.image || item.product.images?.[0]
                    }`}
                    alt={item.product.name}
                  />

                  <div className="cart-info">
                    <p className="cart-name">{item.product.name}</p>
                    <span className="cart-price">
                      ₹{item.product.price}
                    </span>

                    <div className="cart-qty">
                      <button
                        onClick={() =>
                          updateQty(item._id, item.qty - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() =>
                          updateQty(item._id, item.qty + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT - SUMMARY */}
            <div className="cart-summary">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Cart;
