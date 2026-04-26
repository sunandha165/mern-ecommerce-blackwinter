import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem("token");

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWishlist(res.data || []);
    } catch (err) {
      console.error("Error loading wishlist");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/cart`,
        { productId, qty: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to cart");
    } catch (err) {
      console.error("Add to cart failed");
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/wishlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist(res.data);
    } catch (err) {
      console.error("Remove wishlist failed");
    }
  };

  return (
    <>
      <Navbar />

      <section className="wishlist-page">
        <h1>My Wishlist</h1>

        {wishlist.length === 0 ? (
          <p style={{ textAlign: "center" }}>Wishlist is empty</p>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((product) => {
              if (!product) return null;

              return (
                <div className="wishlist-card" key={product._id}>
                  <img
                    src={product.image || "https://via.placeholder.com/200"}
                    alt={product.name}
                  />

                  <h4>{product.name}</h4>
                  <p>₹{product.price}</p>

                  <button
                    className="add-cart-btn"
                    onClick={() => addToCart(product._id)}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(product._id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default Wishlist;