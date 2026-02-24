import { useState } from "react";
import "./admin.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: "#1001",
      customer: "Rahul",
      total: "₹3,998",
      status: "Pending",
    },
    {
      id: "#1002",
      customer: "Sneha",
      total: "₹1,499",
      status: "Paid",
    },
  ]);

  const updateStatus = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
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
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.total}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(index, e.target.value)
                  }
                >
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </td>
              <td>
                <span className="status-updated">
                  Updated
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
