import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "chatMessages",

  initialState: { messages: [] },

  reducers: {
    addOneMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    addMessages: (state, action) => {
      state.messages = action.payload;
    },

    removeMessage: (state, action) => {
      const userID = action.payload.userID;
      state.messages = state.messages.filter(
        (m) => m.from !== userID && m.to !== userID
      );
    },
  },
});

export const { addOneMessage, addMessages, removeMessage } = slice.actions;
export default slice.reducer;
