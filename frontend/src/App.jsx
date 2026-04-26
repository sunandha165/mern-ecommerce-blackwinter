import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

/* USER PAGES */
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";   
import Checkout from "./pages/Checkout";

/* ADMIN PAGES */
import AdminRoute from "./pages/AdminRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminEditProduct from "./pages/admin/AdminEditProduct";
import AdminOrders from "./pages/admin/AdminOrders";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* ADMIN */}
        import AdminRoute from "./pages/AdminRoute";

<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin/edit-product/:id" element={<AdminEditProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </>
  );
}

export default App;
