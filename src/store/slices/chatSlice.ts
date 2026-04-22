import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Message = {
  id: number;
  text: string;
  author: string;
  time: string;
};

type ChatState = {
  messages: Message[];
};

const initialState: ChatState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
