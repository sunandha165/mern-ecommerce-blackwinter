import Product from "../models/Product.js";

/* PUBLIC — GET ALL PRODUCTS */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* PUBLIC — GET SINGLE PRODUCT */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

/* ADMIN — CREATE PRODUCT */
export const createProduct = async (req, res) => {
  try {
    console.log("FILE:", req.file);
    const { name, price, category, description } = req.body;

    const product = await Product.create({
      name,
      price,
      category,
      description,
      image: req.file.path,   // ✅ CLOUDINARY URL
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
  
};

/* ADMIN — UPDATE PRODUCT */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;

    if (req.file) {
      product.image = req.file.path;   // ✅ CLOUDINARY URL
    }

    const updated = await product.save();

    res.json(updated);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Update failed" });
  }
};

/* ADMIN — DELETE PRODUCT */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};

/* ADMIN — GET PRODUCTS */
export const getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* SEARCH PRODUCTS */
export const searchProducts = async (req, res) => {
  try {
    const keyword = req.params.keyword;

    const products = await Product.find({
      name: { $regex: keyword, $options: "i" },
    }).limit(10);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};