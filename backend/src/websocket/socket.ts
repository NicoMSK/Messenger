import type { Server as SocketIOServer, Socket } from "socket.io";

import { ensureSeedData, getChatById } from "../store/store.js";
import {
  addUserToRoom,
  getMessages,
  removeUserFromRoom,
  saveMessage,
} from "../services/chatService.js";
import type { HistoryEvent, MessageNewEvent } from "../types/index.js";

type MessageSendPayload = {
  chatId: string;
  userName: string;
  content: string;
};

function getChatIdFromQuery(socket: Socket): string | null {
  const chatId = socket.handshake.query.chatId;
  if (typeof chatId !== "string") return null;
  const trimmed = chatId.trim();
  return trimmed ? trimmed : null;
}

export function initSocket(io: SocketIOServer) {
  ensureSeedData();

  io.on("connection", (socket) => {
    const chatId = getChatIdFromQuery(socket);

    if (chatId && getChatById(chatId)) {
      socket.join(chatId);

      const history = {
        type: "history" as const,
        messages: getMessages(chatId),
      } as HistoryEvent;
      socket.emit("history", history);
    }

    socket.on("message:send", (payload: MessageSendPayload) => {
      try {
        const chatIdValue =
          typeof payload?.chatId === "string" ? payload.chatId.trim() : "";
        const userNameValue =
          typeof payload?.userName === "string" ? payload.userName.trim() : "";
        const contentValue =
          typeof payload?.content === "string" ? payload.content.trim() : "";

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

        addUserToRoom(chatIdValue, userNameValue);
        const message = saveMessage(chatIdValue, userNameValue, contentValue);

        if (!message) {
          socket.emit("error", { message: "failed to save message" });
          return;
        }

        const out = { type: "message:new" as const, chatId: chatIdValue, message } as MessageNewEvent;
        io.to(chatIdValue).emit("message:new", out);
      } catch {
        socket.emit("error", { message: "unexpected error" });
      }
    });

    socket.on("disconnect", () => {
      const chatId = getChatIdFromQuery(socket);
      // Мы не знаем имя пользователя (оно приходит в payload сообщений),
      // поэтому корректно убрать userName из roomUsers здесь нельзя.
      // roomUsers — опциональный счетчик и его можно доработать позже.
      if (chatId) {
        removeUserFromRoom(chatId, "__unknown__");
      }
    });
  });
}
