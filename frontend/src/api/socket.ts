import { useEffect } from "react";
import { io } from "socket.io-client";

const HOST_URL = "http://localhost:4000";
const newSocket = io(HOST_URL);

export function useSocketConnection() {
  useEffect(() => {
    newSocket.on("connect", () => {
      console.log("Подключено к сокетам:", newSocket.id);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Ошибка подключения к сокетам:", error);
    });

    newSocket.on("reconnect", (attemptNumber) => {
      console.log(`Переподключение к сокетам (попытка ${attemptNumber})`);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);
}

export function sendMessageToServer(
  chatId: string,
  userName: string,
  content: string,
) {
  console.log("socket id:", newSocket.id);
  newSocket.emit("message:send", { chatId, userName, content });
}

// export function subscribeToMessages() {
//   useEffect(() => {
//     newSocket.on("message:new", (message) => {
//       console.log("Новое сообщение:", message);
//       return message;
//     });

//     return () => {
//       newSocket.off("message:new");
//     };
//   }, []);
// }
