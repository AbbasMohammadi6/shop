import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "getAllProducts",

  initialState: { products: [] },

  reducers: {
    request: (state) => {
      state.loading = true;
    },

    success: (state, action) => {
      state.loading = false;
      state.error = null;
      state.products = action.payload;
    },

    fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { request, success, fail } = slice.actions;

export const getAllProducts = () => async (dispatch) => {
  dispatch(request());

  try {
    const { data } = await axios.get("/api/products");

    dispatch(success(data));
  } catch (e) {
    dispatch(fail(e.response.data));
  }
};

export default slice.reducer;
