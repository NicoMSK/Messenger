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
  | { type: "history"; chatId: string; messages: BackendMessage[] }
  | { type: "message:new"; chatId: string; message: BackendMessage }
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
  connect(userName: string) {
    socketService.disconnect();
    ws = new WebSocket(`${WS_URL}?userName=${encodeURIComponent(userName)}`);

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

  openChat(chatId: string) {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "open", chatId }));
    }
  },

  openChatWhenReady(chatId: string): () => void {
    if (!ws) return () => {};
    const targetWs = ws;
    if (targetWs.readyState === WebSocket.OPEN) {
      targetWs.send(JSON.stringify({ type: "open", chatId }));
      return () => {};
    }
    const onOpen = () => {
      if (targetWs.readyState === WebSocket.OPEN) {
        targetWs.send(JSON.stringify({ type: "open", chatId }));
      }
      targetWs.removeEventListener("open", onOpen);
    };
    targetWs.addEventListener("open", onOpen);
    return () => targetWs.removeEventListener("open", onOpen);
  },

  sendMessage(chatId: string, content: string) {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "message:send", chatId, content }));
    }
  },

  addHandler(handler: EventHandler) {
    handlers.add(handler);
  },

  removeHandler(handler: EventHandler) {
    handlers.delete(handler);
  },
};
