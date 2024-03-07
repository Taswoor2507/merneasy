import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "../controller/product.controller.js";
import isAuthUser, { authorizeRoles } from "../middleware/auth.js";
const router = Router();

//create a new product --->admin route
router
  .route("/products/new")
  .post(isAuthUser, authorizeRoles("admin"), createProduct);

//get all product
router.route("/products").get(getAllProducts);

//get product details
router.route("/products/:id").get(getProductDetails);

//update product --> admin route
router
  .route("/products/:id")
  .put(isAuthUser, authorizeRoles("admin"), updateProduct);

//delete product admin route
router
  .route("/products/:id")
  .delete(isAuthUser, authorizeRoles("admin"), deleteProduct);

export default router;
