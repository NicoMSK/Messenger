import type { Message } from "../../store/slices/messagesSlice";

export type ChatProps = {
  chatId: string;
};

export type Chat = {
  id: string;
  name: string;
};

export type ChatCreatedEvent = {
  type: "chat:created";
  chat: Chat;
};

export type HistoryEvent = {
  type: "history";
  messages: Message[];
};
