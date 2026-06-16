import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Chat = {
  id: string;
  name: string;
};

type ChatState = {
  chats: Chat[];
};

const initialState: ChatState = {
  chats: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
    },
  },
});

export const { setChats, addChat, deleteChat } = chatSlice.actions;
