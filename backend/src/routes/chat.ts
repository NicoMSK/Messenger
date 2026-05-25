import { Router } from "express";

import { createChat, deleteChat, getChats, updateChat } from "../store/store.js";
import type { ChatCreatedEvent } from "../types/index.js";

export function createChatRouter(broadcastAll: (data: object) => void) {
  const router = Router();

  router.get("/chat", (_req, res) => {
    res.json(getChats());
  });

  router.post("/chat", (req, res) => {
    const name =
      typeof req.body?.name === "string" ? req.body.name.trim() : "";

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    const chat = createChat(name);
    const event: ChatCreatedEvent = { type: "chat:created", chat };
    broadcastAll(event);

    return res.status(201).json(chat);
  });

  router.patch("/chat/:id", (req, res) => {
    const id = req.params.id;
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    const updated = updateChat(id, name);

    if (!updated) {
      return res.status(404).json({ message: "chat not found" });
    }

    return res.json(updated);
  });

  router.delete("/chat/:id", (req, res) => {
    const id = req.params.id;
    const ok = deleteChat(id);

    if (!ok) {
      return res.status(404).json({ message: "chat not found" });
    }

    return res.json({ ok: true });
  });

  return router;
}

