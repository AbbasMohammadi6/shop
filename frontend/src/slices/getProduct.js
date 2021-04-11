import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "getProduct",

  initialState: { product: {} },

  reducers: {
    request: (state) => {
      state.loading = true;
    },

    success: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = null;
    },

    fail: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

const { request, success, fail } = slice.actions;

export const getProduct = (id) => async (dispatch) => {
  dispatch(request());

  try {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch(success(data));
  } catch (e) {
    dispatch(fail(e));
  }
};

export default slice.reducer;
