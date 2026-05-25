import { WebSocketServer, WebSocket } from "ws";
import type { IncomingMessage, Server } from "http";
import { URL } from "url";

import { ensureSeedData, getChatById } from "../store/store.js";
import { addUserToRoom, getMessages, saveMessage } from "../services/chatService.js";

type Room = Set<WebSocket>;
const rooms = new Map<string, Room>();

function getRoom(chatId: string): Room {
  if (!rooms.has(chatId)) rooms.set(chatId, new Set());
  return rooms.get(chatId)!;
}

function send(ws: WebSocket, data: object) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  }
}

export function broadcast(chatId: string, data: object) {
  const room = rooms.get(chatId);
  if (!room) return;
  for (const client of room) {
    send(client, data);
  }
}

export function broadcastAll(data: object) {
  for (const room of rooms.values()) {
    for (const client of room) {
      send(client, data);
    }
  }
}

function getChatIdFromRequest(req: IncomingMessage): string | null {
  try {
    const url = new URL(req.url!, "http://localhost");
    const chatId = url.searchParams.get("chatId")?.trim();
    return chatId || null;
  } catch {
    return null;
  }
}

export function initWsServer(server: Server) {
  ensureSeedData();

  const wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    const chatId = getChatIdFromRequest(req);

    if (chatId && getChatById(chatId)) {
      getRoom(chatId).add(ws);
      send(ws, { type: "history", messages: getMessages(chatId) });
    } else {
      send(ws, { type: "error", message: "chat not found" });
    }

    ws.on("message", (raw) => {
      try {
        const payload = JSON.parse(raw.toString());
        if (payload?.type !== "message:send") return;

        const chatIdValue =
          typeof payload.chatId === "string" ? payload.chatId.trim() : "";
        const userNameValue =
          typeof payload.userName === "string" ? payload.userName.trim() : "";
        const contentValue =
          typeof payload.content === "string" ? payload.content.trim() : "";

        if (!chatIdValue) {
          send(ws, { type: "error", message: "chatId is required" });
          return;
        }
        if (!getChatById(chatIdValue)) {
          send(ws, { type: "error", message: "chat not found" });
          return;
        }
        if (!userNameValue) {
          send(ws, { type: "error", message: "userName is required" });
          return;
        }
        if (!contentValue) {
          send(ws, { type: "error", message: "content is required" });
          return;
        }

        addUserToRoom(chatIdValue, userNameValue);
        const message = saveMessage(chatIdValue, userNameValue, contentValue);

        if (!message) {
          send(ws, { type: "error", message: "failed to save message" });
          return;
        }

        broadcast(chatIdValue, { type: "message:new", message });
      } catch {
        send(ws, { type: "error", message: "invalid message format" });
      }
    });

    ws.on("close", () => {
      if (chatId) {
        getRoom(chatId).delete(ws);
      }
    });
  });
}
