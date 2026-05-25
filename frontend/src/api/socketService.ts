import type { Message } from "../store/slices/messagesSlice";

const WS_URL = "ws://localhost:4000/ws";

type BackendMessage = {
  id: string;
  chatId: string;
  userName: string;
  content: string;
  createdAt: number;
};

export type WsEvent =
  | { type: "history"; messages: BackendMessage[] }
  | { type: "message:new"; message: BackendMessage }
  | { type: "error"; message: string };

type EventHandler = (event: WsEvent) => void;

export function mapBackendMessage(msg: BackendMessage): Message {
  return {
    id: msg.id,
    text: msg.content,
    author: msg.userName,
    time: new Date(msg.createdAt).toLocaleString().substring(0, 17),
  };
}

let ws: WebSocket | null = null;
const handlers = new Set<EventHandler>();

export const socketService = {
  connect(chatId: string) {
    socketService.disconnect();
    ws = new WebSocket(`${WS_URL}?chatId=${encodeURIComponent(chatId)}`);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as WsEvent;
        handlers.forEach((h) => h(data));
      } catch {
        // ignore malformed frames
      }
    };

    ws.onerror = () => {
      console.error("WebSocket error");
    };
  },

  disconnect() {
    if (ws) {
      ws.close();
      ws = null;
    }
  },

  sendMessage(chatId: string, userName: string, content: string) {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({ type: "message:send", chatId, userName, content }),
      );
    }
  },

  addHandler(handler: EventHandler) {
    handlers.add(handler);
  },

  removeHandler(handler: EventHandler) {
    handlers.delete(handler);
  },
};
