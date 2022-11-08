import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      if (state.timeout) {
        console.log("timeout löytyy:", state.timeout);
        clearTimeout(state.timeout);
      }
      state.content = action.payload.content;
      state.timeout = action.payload.timeoutID;
      return state;
    },
    clearNotification(state, action) {
      console.log("clear");
      return initialState;
    },
  },
});

export const setNotification = (content, time) => {
  const ms = time * 1000;
  return async (dispatch) => {
    const timeoutID = setTimeout(() => {
      dispatch(clearNotification());
    }, ms);
    const notification = {
      content: content,
      timeoutID: timeoutID,
    };
    dispatch(createNotification(notification));
  };
};

export const { createNotification, voteNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
