import { Link } from "react-router-dom";
import "./admin.css";

const AdminDashboard = () => {
  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>

      <div className="admin-cards">
        <Link to="/admin/products" className="admin-card">
          Products
        </Link>

        <Link to="/admin/add-product" className="admin-card">
          Add Product
        </Link>

        <Link to="/admin/orders" className="admin-card">
          Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
