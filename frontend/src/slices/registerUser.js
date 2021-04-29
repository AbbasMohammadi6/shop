import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { success as loginSuccess, reset as resetLogin } from "./loginUser";

const slice = createSlice({
  name: "registerUser",

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

    reset: (state) => {
      state.userInfo = {};
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

    dispatch(success(data));
    dispatch(loginSuccess(data));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (e) {
    dispatch(fail(e.response.data));
  }
};

const logoutUser = () => async (dispatch) => {
  try {
    // remove the cookie
    await axios.get("/api/auth/logout");

    dispatch(reset());
    dispatch(resetLogin());

    localStorage.removeItem("userInfo");
  } catch (e) {
    /* Todo: show this error as Message */
    console.log(e);
  }
};

export { registerUser, success, logoutUser };
export default slice.reducer;
