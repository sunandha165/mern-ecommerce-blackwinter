import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingBag, FiUser } from "react-icons/fi";
import { useState } from "react";
import LoginDrawer from "./LoginDrawer";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [openLogin, setOpenLogin] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  // ✅ NEW (mobile menu)
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav style={nav(isHome)}>
        {/* LEFT */}
        <div style={left}>
          {isHome && (
            <img
              src="/logoo.png"
              alt="logo"
              style={{ width: 34, marginBottom: 4, display: "block" }}
            />
          )}

          <Link
            to="/"
            style={{
              ...brand,
              color: isHome ? "#000" : brand.color,
            }}
          >
            BLACKWINTER
          </Link>
        </div>

        {/* ✅ HAMBURGER (only mobile) */}
        <div style={menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* CENTER */}
        <div style={menuOpen ? mobileMenu : center}>
          <Link to="/" style={menuLink}>Home</Link>
          <Link to="/products" style={menuLink}>Shop All</Link>
          <a href="/#about" style={menuLink}>About</a>
          <a href="/#contact" style={menuLink}>Contact</a>
        </div>

        {/* RIGHT */}
        <div style={right}>
          <FiSearch style={icon} onClick={() => setOpenSearch(true)} />
          <FiHeart style={icon} onClick={() => navigate("/wishlist")} />
          <FiShoppingBag style={icon} onClick={() => navigate("/cart")} />
          <FiUser style={icon} onClick={() => setOpenLogin(true)} />
        </div>
      </nav>

      <SearchOverlay
        open={openSearch}
        onClose={() => setOpenSearch(false)}
      />

      <LoginDrawer
        open={openLogin}
        onClose={() => setOpenLogin(false)}
      />
    </>
  );
}

/* ===== STYLES ===== */

const nav = (isHome) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  padding: "20px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 1000,
  background: isHome ? "transparent" : "rgba(0,0,0,0.85)",
});

const left = { fontWeight: 600 };

const center = {
  display: "flex",
  gap: 30,
};

/* ✅ MOBILE MENU STYLE */
const mobileMenu = {
  position: "absolute",
  top: "70px",
  left: 0,
  width: "100%",
  background: "#000",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
  padding: "20px 0",
};

/* ✅ HAMBURGER ICON */
const menuIcon = {
  display: "none",
  fontSize: 24,
  cursor: "pointer",
  color: "#fff",
};

const brand = {
  color: "#fff",
  textDecoration: "none",
  fontSize: 18,
};

const menuLink = {
  color: "#fff",
  textDecoration: "none",
  fontSize: 16,
};

const right = { display: "flex", gap: 20 };

const icon = {
  fontSize: 20,
  cursor: "pointer",
  color: "#fff",
};

/* ✅ RESPONSIVE */
if (window.innerWidth <= 768) {
  center.display = "none";
  menuIcon.display = "block";
}