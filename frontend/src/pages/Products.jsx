import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/api";
import "./products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/products");
        console.log("PRODUCT PAGE DATA:", res.data); // 👈 ADD THIS
        setProducts(res.data || []);
      } catch (err) {
        console.error("Error loading products");
      }
    };

    fetchProducts();
  }, []);

  const categories = ["All", "Men", "Women", "Couple wear"];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <Navbar />

      <section className="products-page">
        <h1 className="products-title">Shop All</h1>

        <div className="categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={activeCategory === cat ? "category active" : "category"}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="product-card"
            >
              <img
                src={product.image || "https://via.placeholder.com/200"}
                alt={product.name}
              />
              <p>{product.name}</p>
              <span>₹{product.price}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Products;