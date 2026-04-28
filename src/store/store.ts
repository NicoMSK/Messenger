import { configureStore } from "@reduxjs/toolkit";
import { messagesSlice } from "./slices/messagesSlice";

export const store = configureStore({
  reducer: {
    message: messagesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
