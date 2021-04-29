import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { reset as loginReset } from "./loginUser";
import { reset as regsiterReset } from "./registerUser";

const slice = createSlice({
  name: "getUser",

  initialState: { user: {} },

  reducers: {
    request: (state) => {
      state.loading = true;
    },

    success: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },

    fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    reset: (state) => {
      state.user = {};
    },
  },
});

const { request, success, fail, reset } = slice.actions;

const getUser = () => async (dispatch) => {
  dispatch(request());

  try {
    const { data } = await axios.get("/api/users/getuser");

    dispatch(success(data));
  } catch (e) {
    dispatch(fail(e.response.data));
  }
};

const logoutUser = () => async (dispatch) => {
  try {
    // remove the cookie
    await axios.get("/api/auth/logout");

    dispatch(reset());
    dispatch(loginReset());
    dispatch(regsiterReset());
  } catch (e) {
    /* Todo: show this error as Message */
    console.log(e);
  }
};

export { getUser, logoutUser, success };
export default slice.reducer;
