import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  imgUrl: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
    required: true,
  },

  countInStock: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  rating: {
    type: Number,
    default: 2.5,
  },

  nReviews: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
