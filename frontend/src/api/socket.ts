import { io, Socket } from "socket.io-client";
import type { MessageNewEvent } from "../shared/types/socket.types";
import type {
  ChatCreatedEvent,
  ChatDeletedEvent,
} from "../shared/types/chat.types";

const HOST_URL = "http://localhost:4000";
let newSocket: Socket | null = null;

export function connectSocket() {
  if (newSocket) return;

  newSocket = io(HOST_URL);

  const socket = newSocket;

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
  newSocket.emit("message:send", { chatId, userName, content });
}

export function subscribeToMessages(
  callback: (message: MessageNewEvent) => void,
) {
  if (!newSocket) {
    console.error("Сокет не подключен. Сообщение не отправлено.");
    return;
  }
  return newSocket.on("message:new", (message) => {
    callback(message);
  });
}

export function unsubscribeFromMessages() {
  if (!newSocket) {
    console.error("Сокет не подключен. Сообщение не отправлено.");
    return;
  }

  newSocket.off("message:new");
}

export function subscribeToChatCreated(
  callback: (chat: ChatCreatedEvent) => void,
) {
  if (!newSocket) {
    console.error("Сокет не подключен. Сообщение не отправлено.");
    return;
  }

  return newSocket.on("chat:created", (chat) => {
    callback(chat);
  });
}

export function subscribeToChatDeleted(
  callback: (chat: ChatDeletedEvent) => void,
) {
  if (!newSocket) {
    console.error("Сокет не подключен. Сообщение не отправлено.");
    return;
  }

  return newSocket.on("chat:deleted", (chat) => {
    callback(chat);
  });
}
