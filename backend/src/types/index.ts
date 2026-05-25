export type User = {
  id: string;
  name: string;
};

export type Chat = {
  id: string;
  name: string;
  createdAt: number;
};

export type Message = {
  id: string;
  chatId: string;
  userName: string;
  content: string;
  createdAt: number;
};

export type HistoryEvent = {
  type: "history";
  chatId: string;
  messages: Message[];
};

export type MessageNewEvent = {
  type: "message:new";
  chatId: string;
  message: Message;
};

export type ChatCreatedEvent = {
  type: "chat:created";
  chat: Chat;
};
