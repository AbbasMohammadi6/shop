import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { success as registerSuccess } from "./registerUser";

const slice = createSlice({
  name: "loginUser",

  initialState: { userInfo: {} },

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

export const loginUser = (user) => async (dispatch) => {
  dispatch(request());

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post("/api/users/login", user, config);

    dispatch(success(data));
    dispatch(registerSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (e) {
    dispatch(fail(e.response.data));
  }
};

export default slice.reducer;
