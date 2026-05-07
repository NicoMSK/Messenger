import type { Server as SocketIOServer, Socket } from "socket.io";

import { ensureSeedData, getChatById } from "../store/store.js";
import { addUserToRoom, getMessages, removeUserFromRoom, saveMessage } from "../services/chatService.js";
import type { HistoryEvent, MessageNewEvent } from "../types/index.js";

/**
 * Контракт для фронта (React + Redux)
 *
 * Подключение:
 * - URL: `http://localhost:4000` (или PORT)
 * - В query передавать `chatId`, чтобы сразу получить историю и подписаться на комнату:
 *   - пример: `io("http://localhost:4000", { query: { chatId } })`
 *
 * Входящие события:
 * - `history` -> { type: "history", messages: Message[] }
 *   - диспатчить в Redux как "загрузить историю чата"
 * - `message:new` -> { type: "message", message: Message }
 *   - диспатчить в Redux как "добавить сообщение"
 * - `chat:created` -> { type: "chat:created", chat: Chat }
 *   - это событие отправляется REST-роутом при `POST /chat`, чтобы обновить список чатов без перезагрузки
 *
 * Исходящие события (клиент -> сервер):
 * - `message:send` с payload { chatId, userName, content }
 *
 * Ошибки:
 * - `error` -> { message: string }
 */
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

      const history: HistoryEvent = { type: "history", messages: getMessages(chatId) };
      socket.emit("history", history);
    }

    socket.on("message:send", (payload: MessageSendPayload) => {
      try {
        const chatIdValue = typeof payload?.chatId === "string" ? payload.chatId.trim() : "";
        const userNameValue = typeof payload?.userName === "string" ? payload.userName.trim() : "";
        const contentValue = typeof payload?.content === "string" ? payload.content.trim() : "";

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

        const out: MessageNewEvent = { type: "message", message };
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

