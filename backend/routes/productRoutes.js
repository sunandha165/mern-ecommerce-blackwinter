import express from "express";
import upload from "../middleware/cloudUpload.js";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
  searchProducts,
} from "../controllers/productController.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/search/:keyword", searchProducts);

/* ADMIN */
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);
router.get("/admin/all", getAdminProducts);

export default router;