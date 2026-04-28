import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Message = {
  id: number;
  text: string;
  author: string;
  time: string;
};

type MessageState = {
  messages: {
    [chatId: string]: Message[];
  };
};

const initialState: MessageState = {
  messages: {},
};

export const messagesSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: Message }>,
    ) => {
      const { chatId, message } = action.payload;

      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }

      state.messages[chatId].push(message);
    },
  },
});

export const { addMessage } = messagesSlice.actions;
