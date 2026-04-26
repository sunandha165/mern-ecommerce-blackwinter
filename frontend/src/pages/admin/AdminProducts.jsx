import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./admin.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/products`
      );

      // ✅ Ensure always array
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error loading products");
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= DELETE PRODUCT ================= */
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product deleted");

      fetchProducts(); // refresh list
    } catch (error) {
      console.error("Delete failed");
    }
  };

  return (
    <div className="admin">
      <h1>Products</h1>

      <Link to="/admin/add-product" className="admin-add-btn">
        + Add Product
      </Link>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* ✅ Safe rendering */}
          {Array.isArray(products) &&
            products.map((p) => {
              return (
                <tr key={p._id}>
                  <td>
                    <img src={p.image} width="60" alt={p.name} />
                  </td>
                  <td>{p.name}</td>
                  <td>₹{p.price}</td>
                  <td>{p.category}</td>
                  <td>
                    <Link to={`/admin/edit-product/${p._id}`}>
                      Edit
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;