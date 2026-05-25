import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Message = {
  id: string;
  text: string;
  author: string;
  time: string;
};

type MessageState = {
  messages: {
    [chatId: string]: Message[];
  };
  unread: {
    [chatId: string]: number;
  };
};

const initialState: MessageState = {
  messages: {},
  unread: {},
};

export const messagesSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (
      state,
      action: PayloadAction<{ chatId: string; messages: Message[] }>,
    ) => {
      const { chatId, messages } = action.payload;
      state.messages[chatId] = messages;
    },
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
    incrementUnread: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      state.unread[chatId] = (state.unread[chatId] ?? 0) + 1;
    },
    clearUnread: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      state.unread[chatId] = 0;
    },
  },
});

export const { setMessages, addMessage, incrementUnread, clearUnread } =
  messagesSlice.actions;
