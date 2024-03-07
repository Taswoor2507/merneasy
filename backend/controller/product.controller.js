import mongoose from "mongoose";
import Product from "../model/product.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import asyncHandler from "../middleware/asyncHandler.js";

//create a new product ----> admin route
const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
//getProductDetails

const getProductDetails = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//get all products
const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  if (!products) {
    return next(new ErrorHandler("No product found!", 400));
  }
  res.status(200).json({
    success: true,
    products,
  });
});

//update product ---> admin route

const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("No product found!", 404));
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  res.status(200).json({
    success: true,
    message: "product updat successfully",
    updatedProduct,
  });
});

//delete product
const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("No product found!", 404));
  }

  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product successfully removed!",
  });
});

export {
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
};
//CRUD API FOR PRODUCTS COMPLETE
