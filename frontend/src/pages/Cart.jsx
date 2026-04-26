import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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

  // ✅ SAFE TOTAL
  const total = cart.reduce(
    (sum, item) =>
      sum + (item.product?.price || 0) * item.qty,
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
            <div className="cart-items">

              {cart.map((item) => {
                // 🔥 HANDLE NULL PRODUCT
                if (!item.product) {
                  return (
                    <div className="cart-item" key={item._id}>
                      <p>⚠️ Product no longer available</p>

                      <button
                        onClick={() => removeItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="cart-item" key={item._id}>
                    {/* ✅ SAFE IMAGE */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                    />

                    <div className="cart-info">
                      <p>{item.product.name}</p>
                      <span>₹{item.product.price}</span>

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
                );
              })}

            </div>

            <h3>Total: ₹{total}</h3>

            <button onClick={() => navigate("/checkout")}>
              Checkout
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Cart;