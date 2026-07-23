import { io, Socket } from "socket.io-client";
import type { MessageNewEvent } from "../shared/types/socket.types";
import type {
  ChatCreatedEvent,
  HistoryEvent,
} from "../shared/types/chat.types";

const HOST_URL = "http://localhost:4000";
const SOCKET_EVENTS = {
  MESSAGE_NEW: "message:new",
  MESSAGE_SEND: "message:send",
  CHAT_CREATED: "chat:created",
  HISTORY_GET: "history:get",
  HISTORY: "history",
};

let newSocket: Socket | null = null;

export function connectSocket() {
  if (newSocket) return;

  newSocket = io(HOST_URL);

  const socket = newSocket;
  console.log(newSocket?.connected);
  socket.on("connect", () => {
    console.log("Подключено к сокетам:", socket.id);
  });

  socket.on("connect_error", (error) => {
    console.error("Ошибка подключения к сокетам:", error);
  });

  socket.on("reconnect", (attemptNumber) => {
    console.log(`Переподключение к сокетам (попытка ${attemptNumber})`);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
}

export function disconnectSocket() {
  if (newSocket) {
    newSocket.disconnect();
    newSocket = null;
  }
}

export function sendMessageToServer(
  chatId: string,
  userName: string,
  content: string,
) {
  if (!newSocket) {
    console.error("Сокет не подключен. Сообщение не отправлено.");
    return;
  }
  newSocket.emit(SOCKET_EVENTS.MESSAGE_SEND, { chatId, userName, content });
}

export function subscribeToMessages(
  callback: (message: MessageNewEvent) => void,
) {
  if (!newSocket) {
    console.error("Сокет не подключен. Сообщение не отправлено.");
    return;
  }
  return newSocket.on(SOCKET_EVENTS.MESSAGE_NEW, (message) => {
    callback(message);
  });
}

export function unsubscribeFromMessages() {
  if (!newSocket) {
    console.error("Сокет не подключен. Сообщение не отправлено.");
    return;
  }

  newSocket.off(SOCKET_EVENTS.MESSAGE_NEW);
}

export function subscribeToChatCreated(
  callback: (chat: ChatCreatedEvent) => void,
) {
  if (!newSocket) {
    console.error("Сокет не подключен. Сообщение не отправлено.");
    return;
  }

  return newSocket.on(SOCKET_EVENTS.CHAT_CREATED, (chat) => {
    callback(chat);
  });
}

export function getChatHistoryFromServer({ chatId }: { chatId: string }) {
  if (!newSocket) {
    console.error("Сокет не подключен. Сообщение не отправлено.");
    return;
  }

  return newSocket.emit(SOCKET_EVENTS.HISTORY_GET, { chatId });
}

export function subscribeToChatHistory(
  callback: (history: HistoryEvent) => void,
) {
  if (!newSocket) {
    console.error("Сокет не подключен. Сообщение не отправлено.");
    return;
  }

  return newSocket?.on(SOCKET_EVENTS.HISTORY, (history) => {
    callback(history);
  });
}
