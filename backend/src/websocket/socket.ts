import type { Server as SocketIOServer, Socket } from "socket.io";

import { ensureSeedData, getChatById, getChats } from "../store/store.js";
import {
  addUserToRoom,
  getMessages,
  removeUserFromRoom,
  saveMessage,
} from "../services/chatService.js";
import type {
  HistoryEvent,
  MessageNewEvent,
  TypingEvent,
} from "../types/index.js";

type HistoryGetPayload = {
  chatId: string;
};

type ChatMembershipPayload = {
  chatId: string;
  userName: string;
};

type TypingPayload = {
  chatId: string;
  userName: string;
  isTyping: boolean;
};

type MessageSendPayload = {
  chatId: string;
  userName: string;
  content: string;
};

type SocketData = {
  chatId?: string;
  userName?: string;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function initSocket(io: SocketIOServer) {
  ensureSeedData();

  console.log("init socket.io", { chats: getChats() });

  io.on("connection", (socket: Socket) => {
    console.log("new connection", socket.id);

    // Перехват всех входящих пакетов в одном месте
    socket.onAny((eventName: string, ...args: any[]) => {
      console.log(
        `[Входящее] Событие: "${eventName}" | Данные:`,
        JSON.stringify(args),
      );
    });

    // Перехват всех исходящих пакетов в одном месте
    socket.onAnyOutgoing((event, ...args) => {
      console.log(
        `[Исходящее] Событие: "${event}" | Данные:`,
        JSON.stringify(args),
      );
    });

    socket.on("history:get", (payload: HistoryGetPayload) => {
      try {
        const chatId = asTrimmedString(payload?.chatId);

        if (!chatId) {
          socket.emit("error", { message: "chatId is required" });
          return;
        }
        if (!getChatById(chatId)) {
          socket.emit("error", { message: "chat not found" });
          return;
        }

        const history: HistoryEvent = {
          type: "history",
          messages: getMessages(chatId),
        };
        socket.emit("history", history);
      } catch {
        socket.emit("error", { message: "unexpected error" });
      }
    });

    socket.on("chat:join", (payload: ChatMembershipPayload) => {
      try {
        const chatId = asTrimmedString(payload?.chatId);
        const userName = asTrimmedString(payload?.userName);

        if (!chatId) {
          socket.emit("error", { message: "chatId is required" });
          return;
        }
        if (!getChatById(chatId)) {
          socket.emit("error", { message: "chat not found" });
          return;
        }
        if (!userName) {
          socket.emit("error", { message: "userName is required" });
          return;
        }

        const data = socket.data as SocketData;
        data.chatId = chatId;
        data.userName = userName;
        addUserToRoom(chatId, userName);
      } catch {
        socket.emit("error", { message: "unexpected error" });
      }
    });

    socket.on("chat:leave", (payload: ChatMembershipPayload) => {
      try {
        const chatId = asTrimmedString(payload?.chatId);
        const userName =
          asTrimmedString(payload?.userName) ||
          (socket.data as SocketData).userName ||
          "";

        if (!chatId || !userName) return;

        removeUserFromRoom(chatId, userName);
      } catch {
        socket.emit("error", { message: "unexpected error" });
      }
    });

    socket.on("typing", (payload: TypingPayload) => {
      try {
        const chatId = asTrimmedString(payload?.chatId);
        const userName = asTrimmedString(payload?.userName);

        if (!chatId || !getChatById(chatId) || !userName) return;

        const event: TypingEvent = {
          type: "typing",
          chatId,
          userName,
          isTyping: Boolean(payload?.isTyping),
        };
        socket.broadcast.emit("typing", event);
      } catch {
        socket.emit("error", { message: "unexpected error" });
      }
    });

    socket.on("message:send", (payload: MessageSendPayload) => {
      try {
        const chatIdValue = asTrimmedString(payload?.chatId);
        const userNameValue = asTrimmedString(payload?.userName);
        const contentValue = asTrimmedString(payload?.content);

        if (!chatIdValue) {
          socket.emit("error", { message: "chatId is required" });
          return;
        }
        if (!getChatById(chatIdValue)) {
          socket.emit("error", { message: "chat not found" });
          return;
        }
        if (!userNameValue) {
          socket.emit("error", { message: "userName is required" });
          return;
        }
        if (!contentValue) {
          socket.emit("error", { message: "content is required" });
          return;
        }

        const message = saveMessage(chatIdValue, userNameValue, contentValue);

        if (!message) {
          socket.emit("error", { message: "failed to save message" });
          return;
        }

        const out: MessageNewEvent = { type: "message", message };
        io.emit("message:new", out);
      } catch {
        socket.emit("error", { message: "unexpected error" });
      }
    });

    socket.on("disconnect", () => {
      const data = socket.data as SocketData;
      if (data.chatId && data.userName) {
        removeUserFromRoom(data.chatId, data.userName);
      }
    });
  });
}
