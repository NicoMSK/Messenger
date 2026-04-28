import { configureStore } from "@reduxjs/toolkit";
import { messagesSlice } from "./slices/messagesSlice";
import { chatSlice } from "./slices/chatsSlice";

export const store = configureStore({
  reducer: {
    message: messagesSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
