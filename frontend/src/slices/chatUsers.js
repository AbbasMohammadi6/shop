import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "chatUsers",

  initialState: { users: [] },

  reducers: {
    addUsers: (state, action) => {
      const users = action.payload;
      console.log("THIS IS USERS", users);
      state.users = [...users];
    },

    addOneUser: (state, action) => {
      const user = action.payload;
      console.log(user);
      state.users.push(user);
    },

    removeUser: (state, action) => {
      const { userID } = action.payload;
      state.users = state.users.filter((user) => userID !== user.userID);
    },
  },
});

export const { addUsers, addOneUser, removeUser } = slice.actions;
export default slice.reducer;
