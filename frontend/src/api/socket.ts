import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

const HOST_URL = "http://localhost:4000";
let newSocket: Socket | null = null;

export function useSocketConnection(isAuthorized: boolean) {
  useEffect(() => {
    if (!isAuthorized) return;

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

    return () => {
      socket.disconnect();
    };
  }, [isAuthorized]);
}

export function sendMessageToServer(
  chatId: string,
  userName: string,
  content: string,
) {
  console.log("socket id:", newSocket.id);
  newSocket.emit("message:send", { chatId, userName, content });
}
