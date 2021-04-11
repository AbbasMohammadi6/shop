import { configureStore } from "@reduxjs/toolkit";
import getAllProductsReducer from "./slices/getAllProducts";
import getProductReducer from "./slices/getProduct";

const store = configureStore({
  reducer: {
    getAllProducts: getAllProductsReducer,
    getProduct: getProductReducer,
  },
});

export default store;
