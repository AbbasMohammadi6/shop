import { configureStore } from "@reduxjs/toolkit";
import getAllProductsReducer from "./slices/getAllProducts";
import getProductReducer from "./slices/getProduct";
import userRegisterReducer from "./slices/registerUser";

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const store = configureStore({
  preloadedState: {
    userRegister: { userInfo },
  },

  reducer: {
    getAllProducts: getAllProductsReducer,
    getProduct: getProductReducer,
    userRegister: userRegisterReducer,
  },
});

export default store;
