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
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data || []);
    } catch (error) {
      console.error("Error loading products");
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
        `http://localhost:5000/api/admin/products/${id}`,
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
          {products.map((p) => {
            const imagePath =
              p.image || p.images?.[0] || "";

            return (
              <tr key={p._id}>
                <td>
                  <img
                    src={`http://localhost:5000${imagePath}`}
                    alt=""
                    width="60"
                  />
                </td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.category}</td>
                <td>
                  <Link to={`/admin/edit-product/${p._id}`}>Edit</Link>

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