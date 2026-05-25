import { WebSocketServer, WebSocket } from "ws";
import type { IncomingMessage, Server } from "http";
import { URL } from "url";

import { ensureSeedData, getChatById } from "../store/store.js";
import { getMessages, saveMessage } from "../services/chatService.js";
import type { HistoryEvent, MessageNewEvent } from "../types/index.js";

function wsLog(event: string, req: IncomingMessage, extra?: string) {
  const now = new Date().toISOString();
  const url = req.url ?? "/ws";
  const ip = req.socket.remoteAddress ?? "-";
  const parts = [`[${now}]`, "WS", event.toUpperCase().padEnd(10), url, `ip=${ip}`];
  if (extra) parts.push(extra);
  console.log(parts.join(" "));
}

// All connected clients: ws → userName
const clients = new Map<WebSocket, string>();

function send(ws: WebSocket, data: object) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  }
}

export function broadcastAll(data: object) {
  for (const ws of clients.keys()) {
    send(ws, data);
  }
}

function getUserNameFromRequest(req: IncomingMessage): string | null {
  try {
    const url = new URL(req.url!, "http://localhost");
    const userName = url.searchParams.get("userName")?.trim();
    return userName || null;
  } catch {
    return null;
  }
}

export function initWsServer(server: Server) {
  ensureSeedData();

  const wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    const userName = getUserNameFromRequest(req);
    wsLog("connect", req, userName ? `userName=${userName}` : "no userName");

    if (!userName) {
      send(ws, { type: "error", message: "userName is required" });
      ws.close();
      return;
    }

    clients.set(ws, userName);

    ws.on("message", (raw) => {
      try {
        const payload = JSON.parse(raw.toString());
        wsLog("message", req, `type=${payload?.type ?? "unknown"}`);

        if (payload?.type === "open") {
          const chatId = typeof payload.chatId === "string" ? payload.chatId.trim() : "";
          if (!chatId || !getChatById(chatId)) {
            send(ws, { type: "error", message: "chat not found" });
            return;
          }
          const out: HistoryEvent = {
            type: "history",
            chatId,
            messages: getMessages(chatId),
          };
          send(ws, out);
          return;
        }

        if (payload?.type === "message:send") {
          const chatId = typeof payload.chatId === "string" ? payload.chatId.trim() : "";
          const content = typeof payload.content === "string" ? payload.content.trim() : "";

          if (!chatId || !getChatById(chatId)) {
            send(ws, { type: "error", message: "chat not found" });
            return;
          }
          if (!content) {
            send(ws, { type: "error", message: "content is required" });
            return;
          }

          const connectedUserName = clients.get(ws)!;
          const message = saveMessage(chatId, connectedUserName, content);

          if (!message) {
            send(ws, { type: "error", message: "failed to save message" });
            return;
          }

          const out: MessageNewEvent = { type: "message:new", chatId, message };
          broadcastAll(out);
          return;
        }
      } catch {
        send(ws, { type: "error", message: "invalid message format" });
      }
    });

    ws.on("close", () => {
      wsLog("disconnect", req, `userName=${clients.get(ws) ?? "unknown"}`);
      clients.delete(ws);
    });
  });
}
