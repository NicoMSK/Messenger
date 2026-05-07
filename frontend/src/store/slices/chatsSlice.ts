import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Chat = {
  id: string;
  title: string;
};

type ChatState = {
  chats: Chat[];
};

const initialState: ChatState = {
  chats: [
    { id: "chat-1", title: "Тестовый ЧАТ" },
    { id: "chat-2", title: "Тестовый ЧАТ-2" },
  ],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
    },
  },
});

export const { addChat } = chatSlice.actions;
