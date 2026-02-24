import express from "express";
import {
  getAllProducts,
  getProductById,
  
  searchProducts,
} from "../controllers/productController.js";


const router = express.Router();

/* ROUTES */
router.get("/", getAllProducts);       // /api/products
router.get("/:id", getProductById);    // /api/products/:id
router.get("/search/:keyword", searchProducts);

export default router;
