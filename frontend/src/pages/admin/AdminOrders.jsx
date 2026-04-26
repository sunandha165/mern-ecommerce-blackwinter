import { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  /* FETCH ORDERS */
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data || []);
    } catch (error) {
      console.error("Error loading orders");
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* UPDATE STATUS */
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
    } catch (error) {
      console.error("Status update failed");
    }
  };

  return (
    <div className="admin">
      <h1>Orders</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(orders) &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(-6)}</td>
                <td>{order.user?.name}</td>
                <td>₹{order.totalPrice}</td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>Paid</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                <td>Updated</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;