import "./admin.css";

const AdminEditProduct = () => {
  return (
    <div className="admin">
      <h1>Edit Product</h1>

      <form className="admin-form">
        <input type="text" defaultValue="Winter T-Shirt" />
        <input type="text" defaultValue="1499" />
        <input type="text" defaultValue="T-Shirts" />
        <input type="file" />
        <textarea defaultValue="Premium winter t-shirt"></textarea>

        <button>Update Product</button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
