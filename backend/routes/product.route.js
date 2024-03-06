import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "../controller/product.controller.js";
const router = Router();

//create a new product --->admin route
router.route("/products/new").post(createProduct);

//get all product
router.route("/products").get(getAllProducts);

//get product details
router.route("/products/:id").get(getProductDetails);

//update product --> admin route
router.route("/products/:id").put(updateProduct);

//delete product
router.route("/products/:id").delete(deleteProduct);

export default router;
