import { useState } from "react";
import Navbar from "../components/Navbar";
import "./checkout.css";

const Checkout = () => {
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const placeOrder = async () => {
    if (!form.address || !form.city || !form.state || !form.pincode) {
      alert("Fill all address fields");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            shippingAddress: form,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Order failed");
        return;
      }

      alert("Order placed successfully");
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <>
      <Navbar />

      <section className="checkout-page">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-container">
          <div className="checkout-form">
            <h3>Shipping Address</h3>

            <input
              placeholder="Street Address"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            <input
              placeholder="City"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
            />

            <input
              placeholder="State"
              value={form.state}
              onChange={(e) =>
                setForm({ ...form, state: e.target.value })
              }
            />

            <input
              placeholder="Pincode"
              value={form.pincode}
              onChange={(e) =>
                setForm({ ...form, pincode: e.target.value })
              }
            />
          </div>

          <div className="checkout-summary">
            <button className="place-order-btn" onClick={placeOrder}>
              Place Order (COD)
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;