import { io, Socket } from "socket.io-client";

const HOST_URL = "http://localhost:4000";
let newSocket: Socket | null = null;

export function connectSocket() {
  if (newSocket) return;

  newSocket = io(HOST_URL);

  const socket = newSocket;

  socket.on("connect", () => {
    console.log("Подключено к сокетам:", socket.id);
  });

  socket.on("message:new", (message) => {
    console.log("Новое сообщение:", message);
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
