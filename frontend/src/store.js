import { configureStore } from "@reduxjs/toolkit";
import getAllProductsReducer from "./slices/getAllProducts";
import getProductReducer from "./slices/getProduct";
import userRegisterReducer from "./slices/registerUser";
import userLoginReducer from "./slices/loginUser";
import cartReducer from "./slices/cart";

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { products: [] };

const store = configureStore({
  preloadedState: {
    userRegister: { userInfo },
    cart,
  },

  reducer: {
    getAllProducts: getAllProductsReducer,
    getProduct: getProductReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    cart: cartReducer,
  },
});

export default store;
