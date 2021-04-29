import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { success as getUserSuccess } from "./getUser";

const slice = createSlice({
  name: "registerUser",

  initialState: {},

  reducers: {
    request: (state) => {
      state.loading = true;
    },

    success: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },

    fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    reset: (state) => {
      state.success = false;
    },
  },
});

const { request, success, fail, reset } = slice.actions;

const registerUser = (user) => async (dispatch) => {
  dispatch(request());

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post("/api/auth/register", user, config);

    dispatch(success());
    dispatch(getUserSuccess(data));
  } catch (e) {
    dispatch(fail(e.response.data));
  }
};

export { registerUser, reset };
export default slice.reducer;
