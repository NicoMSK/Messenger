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
