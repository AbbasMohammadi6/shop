import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "registerUser",

  initialState: {},

  reducers: {
    request: (state) => {
      state.loading = true;
    },

    success: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },

    fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { request, success, fail } = slice.actions;

export const registerUser = (user) => async (dispatch) => {
  dispatch(request());

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post("/api/users/register", user, config);

    dispatch(success(data));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (e) {
    dispatch(fail(e.response.data));
  }
};

export default slice.reducer;
