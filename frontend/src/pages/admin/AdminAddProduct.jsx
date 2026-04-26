import { useState } from "react";
import "./admin.css";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("image", product.image);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/products`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Product Added Successfully");

        // optional reset
        setProduct({
          name: "",
          price: "",
          category: "",
          description: "",
          image: null,
        });
      } else {
        alert(data.message || "Error adding product");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="admin">
      <h1>Add Product</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Price"
          onChange={(e) =>
            setProduct({ ...product, price: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Category"
          onChange={(e) =>
            setProduct({ ...product, category: e.target.value })
          }
        />

        <input
          type="file"
          onChange={(e) =>
            setProduct({ ...product, image: e.target.files[0] })
          }
        />

        <textarea
          placeholder="Description"
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        ></textarea>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminAddProduct;