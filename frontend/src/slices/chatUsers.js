import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "chatUsers",

  initialState: { users: [] },

  reducers: {
    addUsers: (state, action) => {
      const users = action.payload;
      state.users = [...users];
    },

    addOneUser: (state, action) => {
      const user = action.payload;
      state.users.push(user);
    },

    removeUser: (state, action) => {
      const { userID } = action.payload;
      state.users = state.users.filter((user) => userID !== user.userID);
    },

    reset: (state) => {
      state.users = [];
    },
  },
});

export const { addUsers, addOneUser, removeUser, reset } = slice.actions;
export default slice.reducer;
