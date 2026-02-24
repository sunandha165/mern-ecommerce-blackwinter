import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import adminOnly from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
} from "../controllers/productController.js";

const router = express.Router();

/* ADMIN LOGIN */
router.post("/login", adminLogin);

/* ADMIN PRODUCT MANAGEMENT */
router.post(
  "/products",
  protect,
  adminOnly,
  upload.single("image"),
  createProduct
);

router.put(
  "/products/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateProduct
);

router.delete(
  "/products/:id",
  protect,
  adminOnly,
  deleteProduct
);

router.get(
  "/products",
  protect,
  adminOnly,
  getAdminProducts
);

export default router;