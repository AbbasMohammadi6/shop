import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

export const getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;

  console.log(id);

  const product = await Product.findById(id);

  if (!product) throw new Error("Product not found");
  else res.json(product);
});
