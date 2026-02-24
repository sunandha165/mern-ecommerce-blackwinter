import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem("token");

  /* ================= FETCH WISHLIST ================= */
  const fetchWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Wishlist Data:", res.data); // ⭐ debug

      setWishlist(res.data || []);
    } catch (err) {
      console.error("Error loading wishlist");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  /* ================= ADD TO CART ================= */
  const addToCart = async (productId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart",
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

  /* ================= REMOVE FROM WISHLIST ================= */
  const removeFromWishlist = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/wishlist/${id}`,
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

              const imagePath =
                product.image || product.images?.[0] || "";

              return (
                <div className="wishlist-card" key={product._id}>
                  <img
                    src={`http://localhost:5000${imagePath}`}
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