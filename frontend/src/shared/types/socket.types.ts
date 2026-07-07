import type { Message } from "../../store/slices/messagesSlice";

export type MessageNewEvent = {
  type: "message";
  message: Message;
};
