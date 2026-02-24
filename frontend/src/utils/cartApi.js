import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const addToCart = async (productId, qty) => {
  const token = localStorage.getItem("token");

  return axios.post(
    `${API}/api/cart`,
    { productId, qty },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
