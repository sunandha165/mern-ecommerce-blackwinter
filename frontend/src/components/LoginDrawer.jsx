import { useEffect, useState } from "react";
import api from "../utils/api";

export default function LoginDrawer({ open, onClose }) {
  const [mode, setMode] = useState("login");

  // LOGIN STATES
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // REGISTER STATES
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setMode("login");
      setError("");
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  /* ================= PASSWORD VALIDATION ================= */
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    return regex.test(password);
  };

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    try {
      const res = await api.post("/api/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login successful");
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  /* ================= REGISTER ================= */
  const handleRegister = async () => {
    setError("");

    if (!firstName || !lastName || !registerEmail || !registerPassword) {
      setError("All fields are required");
      return;
    }

    if (!validatePassword(registerPassword)) {
      setError(
        "Password must be at least 6 characters and include a letter, number, and special character."
      );
      return;
    }

    try {
      const res = await api.post("/api/auth/register", {
        name: `${firstName} ${lastName}`,
        email: registerEmail,
        password: registerPassword,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Account created successfully");
      setMode("login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={overlay} onClick={onClose}>
      <div style={drawer} onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div style={header}>
          <h3>{mode === "login" ? "LOGIN" : "REGISTER"}</h3>
          <span style={close} onClick={onClose}>
            ✕
          </span>
        </div>

        {/* ERROR MESSAGE */}
        {error && <p style={{ color: "red", marginBottom: 10 }}>{error}</p>}

        {/* LOGIN */}
        {mode === "login" ? (
          <>
            <input
              placeholder="Email address"
              style={input}
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              style={input}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            <button style={primaryBtn} onClick={handleLogin}>
              SIGN IN
            </button>

            <p style={text}>
              Lost password? <span style={link}>Forgot Password</span>
            </p>

            <button style={secondaryBtn} onClick={() => setMode("register")}>
              CREATE AN ACCOUNT
            </button>
          </>
        ) : (
          /* REGISTER */
          <>
            <input
              placeholder="First Name"
              style={input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              placeholder="Last Name"
              style={input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              placeholder="Email"
              style={input}
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              style={input}
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />

            <p style={{ fontSize: 12, color: "#555", marginBottom: 10 }}>
              Password must contain at least 6 characters, including a number
              and special character.
            </p>

            <button style={primaryBtn} onClick={handleRegister}>
              REGISTER
            </button>

            <p style={text}>
              Already have an account?{" "}
              <span style={link} onClick={() => setMode("login")}>
                Login here
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  zIndex: 200,
};

const drawer = {
  position: "absolute",
  right: 0,
  top: 0,
  width: 420,
  height: "100%",
  background: "#fff",
  padding: 30,
  display: "flex",
  flexDirection: "column",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 30,
};

const close = {
  cursor: "pointer",
  fontSize: 20,
};

const input = {
  border: "none",
  borderBottom: "1px solid #000",
  padding: "12px 0",
  marginBottom: 25,
  outline: "none",
};

const primaryBtn = {
  background: "#222",
  color: "#fff",
  padding: "14px",
  border: "none",
  cursor: "pointer",
  marginTop: 10,
};

const secondaryBtn = {
  background: "#eee",
  padding: "14px",
  border: "none",
  cursor: "pointer",
  marginTop: 20,
};

const text = {
  textAlign: "center",
  marginTop: 20,
};

const link = {
  cursor: "pointer",
  textDecoration: "underline",
};