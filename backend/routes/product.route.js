import { Router } from "express";
import { getAllProducts } from "../controller/product.controller.js";
const router = Router();

router.route("/products").get(getAllProducts);

export default router;
