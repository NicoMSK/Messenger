import { Router } from "express";

export function createMessageRouter() {
  const router = Router();

  // Сообщения передаются только через WebSocket (socket.io).
  // Этот роут оставлен как заготовка на будущее.

  return router;
}

