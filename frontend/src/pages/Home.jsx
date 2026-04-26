import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import "./home.css";

const Home = () => {
  const [featured, setFeatured] = useState([]);

  /* ================= FETCH FEATURED PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/products`
        );

        console.log("HOME DATA:", res.data);
        setFeatured(res.data.slice(0, 3)); // show first 3
      } catch (error) {
        console.error("Error loading products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <Link to="/products" className="hero-btn">
            Explore Collection
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured">
        <h2 className="section-title">Featured Collection</h2>

        <div className="product-grid">
          {featured.map((p) => (
            <Link
              to={`/product/${p._id}`}
              className="product-card"
              key={p._id}
            >
              <img
                src={p.image || "https://via.placeholder.com/200"}
                alt={p.name}
              />
              <p>{p.name}</p>
              <span>₹{p.price}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust">
        <div className="trust-item">
          <span className="trust-icon">🔒</span>
          <p>Secure Payments</p>
        </div>

        <div className="trust-item">
          <span className="trust-icon">🚚</span>
          <p>Safe Shipping</p>
        </div>

        <div className="trust-item">
          <span className="trust-icon">↩</span>
          <p>Easy Returns</p>
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="brand-statement">
        <p>Designed for winter. Crafted for everyday elegance.</p>
      </section>

      {/* ABOUT */}
      <section id="about" style={section}>
        <h2>About BLACKWINTER</h2>
        <p>
          BLACKWINTER is a modern streetwear clothing brand focused on minimal
          aesthetics, premium comfort, and bold identity.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" style={section}>
        <h2>Contact Us</h2>
        <p>Email: support@blackwinter.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Location: Hyderabad, India</p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h3>BLACKWINTER</h3>
        <ul>
          <li>Shop All</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </footer>
    </>
  );
};

/* ===== SECTION STYLE ===== */
const section = {
  padding: "80px 40px",
  background: "#f8f8f8",
  textAlign: "center",
};

export default Home;