import { configureStore } from "@reduxjs/toolkit";
import getAllProductsReducer from "./slices/getAllProducts";

const store = configureStore({
  reducer: {
    getAllProducts: getAllProductsReducer,
  },
});

export default store;
