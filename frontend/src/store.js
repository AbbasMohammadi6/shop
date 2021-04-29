import { configureStore } from "@reduxjs/toolkit";
import getAllProductsReducer from "./slices/getAllProducts";
import getProductReducer from "./slices/getProduct";
import userRegisterReducer from "./slices/registerUser";
import userLoginReducer from "./slices/loginUser";
import cartReducer from "./slices/cart";
import chatUsersReducer from "./slices/chatUsers";
import chatMessagesReducer from "./slices/chatMessages";
import userInfoReducer from "./slices/getUser";

const cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { products: [] };

const store = configureStore({
  preloadedState: {
    cart,
  },

  reducer: {
    getAllProducts: getAllProductsReducer,
    getProduct: getProductReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    cart: cartReducer,
    chatUsers: chatUsersReducer,
    chatMessages: chatMessagesReducer,
    userInfo: userInfoReducer,
  },
});

export default store;
