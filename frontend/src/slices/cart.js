import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cart",

  initialState: { products: [] },

  reducers: {
    add: (state, action) => {
      // if the item is already exists change the qty
      const existingProduct = state.products.find((item) => {
        return item.product._id === action.payload.product._id;
      });

      if (existingProduct) {
        state.products = state.products.map((item) => {
          if (item.product._id === action.payload.product._id) {
            return action.payload;
          } else return item;
        });
      } else state.products.push(action.payload);

      localStorage.setItem(
        "cart",
        JSON.stringify({ products: state.products })
      );
    },

    remove: (state, action) => {
      state.products = state.products.filter(
        (item) => item.product._id !== action.payload
      );
    },
  },
});

export const { add, remove } = slice.actions;

export default slice.reducer;
