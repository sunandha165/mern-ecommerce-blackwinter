import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { addToCart } from "../utils/cartApi";
import "./productDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [moreProducts, setMoreProducts] = useState([]);

  const token = localStorage.getItem("token");

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`
        );

        const currentProduct = res.data;
        setProduct(currentProduct);

        fetchOtherProducts(currentProduct);
      } catch (error) {
        console.error("Failed to fetch product");
      }
    };

    fetchProduct();
  }, [id]);

  /* ================= FETCH RELATED PRODUCTS ================= */
  const fetchOtherProducts = async (currentProduct) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/products`
      );

      const all = res.data || [];

      /* ===== SIMILAR PRODUCTS (CATEGORY MATCH) ===== */
      let similarItems = all.filter(
        (p) =>
          p.category &&
          currentProduct.category &&
          p.category.toLowerCase() ===
            currentProduct.category.toLowerCase() &&
          p._id !== currentProduct._id
      );

      /* ===== FALLBACK IF NO SIMILAR ===== */
      if (similarItems.length === 0) {
        similarItems = all.filter((p) => p._id !== currentProduct._id);
      }

      /* ===== MORE PRODUCTS ===== */
      const more = all.filter((p) => p._id !== currentProduct._id);

      setSimilar(similarItems.slice(0, 3));
      setMoreProducts(more.slice(0, 3));
    } catch (error) {
      console.error("Failed loading related products");
    }
  };

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      alert("Added to cart");
    } catch (error) {
      alert("Please login to add items to cart");
    }
  };

  /* ================= ADD TO WISHLIST ================= */
  const addToWishlist = async () => {
    if (!token) {
      alert("Please login to add to wishlist");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/wishlist/${product._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to wishlist ❤️");
    } catch (err) {
      alert("Failed to add to wishlist");
    }
  };

  return (
    <>
      <Navbar />

      {/* BREADCRUMBS */}
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Shop</Link>
        <span>/</span>
        <span className="breadcrumb-current">
          {product ? product.name : "Loading..."}
        </span>
      </div>

      {/* PRODUCT DETAILS */}
      {product ? (
        <section className="product-detail">
          <div className="left">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}${product.image}`}
              alt={product.name}
              className="mainImg"
            />
          </div>

          <div className="right">
            <h2 className="prodName">{product.name}</h2>
            <p className="prodPrice">₹{product.price}</p>
            <p className="prodDesc">{product.description}</p>

            <div className="actions">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="qtyInput"
              />

              <button className="addToCartBtn" onClick={handleAddToCart}>
                Add to Cart
              </button>

              <button className="wishlistBtn" onClick={addToWishlist}>
                ♡ Wishlist
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="product-loading">Loading product...</div>
      )}

      {/* ================= SIMILAR PRODUCTS ================= */}
      <section className="similar-section">
        <h3 className="section-heading">Similar Products</h3>

        <div className="products-grid">
          {similar.map((p) => (
            <Link
              to={`/product/${p._id}`}
              className="product-card"
              key={p._id}
            >
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${p.image}`}
                alt={p.name}
              />
              <p>{p.name}</p>
              <span>₹{p.price}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= MORE PRODUCTS ================= */}
      <section className="more-section">
        <h3 className="section-heading">More Products You May Like</h3>

        <div className="products-grid">
          {moreProducts.map((p) => (
            <Link
              to={`/product/${p._id}`}
              className="product-card"
              key={p._id}
            >
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${p.image}`}
                alt={p.name}
              />
              <p>{p.name}</p>
              <span>₹{p.price}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;