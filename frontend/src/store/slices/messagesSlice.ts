import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Message = {
  id: string;
  chatId: string;
  content: string;
  userName: string;
  createdAt: number;
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

    setChatHistory: (state, action: PayloadAction<{ messages: Message[] }>) => {
      const { messages: history } = action.payload;

      if (!history || history.length === 0) return;
      
      const chatId = history[0].chatId;

      state.messages[chatId] = history;
    },
  },
});

export const { addMessage, setChatHistory } =
  messagesSlice.actions;
