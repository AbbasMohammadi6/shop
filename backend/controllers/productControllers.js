import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});

//     res.json(products);
//   } catch (e) {
//     res.status(500).json({ message: "Server error, try again later" });
//   }
// };
