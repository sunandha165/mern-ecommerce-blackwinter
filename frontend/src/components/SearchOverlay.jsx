import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchOverlay({ open, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  /* ================= SEARCH API ================= */
  useEffect(() => {
    const fetchSearch = async () => {
      if (!query) return setResults([]);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/search/${query}`
        );

        setResults(res.data || []);
      } catch (error) {
        console.error("Search error");
      }
    };

    const delayDebounce = setTimeout(fetchSearch, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  if (!open) return null;

  return (
    <div style={overlay} onClick={onClose}>
      <div style={box} onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div style={header}>
          <input
            autoFocus
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={input}
          />
          <span style={close} onClick={onClose}>✕</span>
        </div>

        {/* RESULTS */}
        <div style={resultsBox}>
          {query && results.length === 0 && <p>No products found</p>}

          {results.map((item) => (
            <div
              key={item._id}
              style={resultItem}
              onClick={() => {
                navigate(`/product/${item._id}`);
                onClose();
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  zIndex: 2000,
};

const box = {
  background: "#fff",
  maxWidth: 700,
  margin: "80px auto",
  padding: 30,
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: 20,
};

const input = {
  flex: 1,
  border: "none",
  borderBottom: "1px solid #000",
  fontSize: 18,
  padding: "10px 0",
  outline: "none",
};

const close = {
  cursor: "pointer",
  fontSize: 20,
};

const resultsBox = {
  marginTop: 30,
};

const resultItem = {
  padding: "12px 0",
  borderBottom: "1px solid #eee",
  cursor: "pointer",
};