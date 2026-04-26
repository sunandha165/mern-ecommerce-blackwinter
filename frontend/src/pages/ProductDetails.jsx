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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`
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

  const fetchOtherProducts = async (currentProduct) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products`
      );

      const all = res.data || [];

      let similarItems = all.filter(
        (p) =>
          p.category &&
          currentProduct.category &&
          p.category.toLowerCase() ===
            currentProduct.category.toLowerCase() &&
          p._id !== currentProduct._id
      );

      if (similarItems.length === 0) {
        similarItems = all.filter((p) => p._id !== currentProduct._id);
      }

      const more = all.filter((p) => p._id !== currentProduct._id);

      setSimilar(similarItems.slice(0, 3));
      setMoreProducts(more.slice(0, 3));
    } catch (error) {
      console.error("Failed loading related products");
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      alert("Added to cart");
    } catch (error) {
      alert("Please login to add items to cart");
    }
  };

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

      {product ? (
        <section className="product-detail">
          <div className="left">
            <img
              src={product.image}
              alt={product.name}
              className="mainImg"
            />
          </div>

          <div className="right">
            <h2 className="prodName">{product.name}</h2>
            <p className="prodPrice">₹{product.price}</p>
            <p className="prodDesc">{product.description}</p>

            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={addToWishlist}>Wishlist</button>
          </div>
        </section>
      ) : (
        <div>Loading...</div>
      )}

      {/* ================= SIMILAR PRODUCTS ================= */}
      <section>
  <h3>Similar Products</h3>

  <div className="products-grid">
    {similar.map((p) => (
      <div className="product-card" key={p._id}>
        <Link to={`/product/${p._id}`}>
          <img src={p.image} alt={p.name} />
        </Link>

        <p>{p.name}</p>
        <span>₹{p.price}</span>
      </div>
    ))}
  </div>
</section>

      {/* ================= MORE PRODUCTS ================= */}
     <section>
  <h3>More Products</h3>

  <div className="products-grid">
    {moreProducts.map((p) => (
      <div className="product-card" key={p._id}>
        <Link to={`/product/${p._id}`}>
          <img src={p.image} alt={p.name} />
        </Link>

        <p>{p.name}</p>
        <span>₹{p.price}</span>
      </div>
    ))}
  </div>
</section>
    </>
  );
};

export default ProductDetails;