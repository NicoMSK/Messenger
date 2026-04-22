import { configureStore } from "@reduxjs/toolkit";
import { chatSlice } from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    message: chatSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
