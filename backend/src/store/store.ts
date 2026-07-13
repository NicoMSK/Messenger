import crypto from "crypto";
import type { Chat, Message, User } from "../types/index.js";
import { db } from "./db.js";

const HISTORY_LIMIT = 50;

export function loginUser(name: string): User {
  const normalized = name.trim();

  const existing = db
    .prepare("SELECT id, name FROM users WHERE name = ?")
    .get(normalized) as User | undefined;

  if (existing) {
    return existing;
  }

  const user: User = { id: crypto.randomUUID(), name: normalized };
  db.prepare("INSERT INTO users (id, name) VALUES (?, ?)").run(user.id, user.name);
  return user;
}

export function createChat(name: string): Chat {
  const chat: Chat = { id: crypto.randomUUID(), name: name.trim(), createdAt: Date.now() };
  db.prepare("INSERT INTO chats (id, name, createdAt) VALUES (?, ?, ?)").run(
    chat.id,
    chat.name,
    chat.createdAt,
  );
  return chat;
}

export function getChats(): Chat[] {
  return db
    .prepare("SELECT id, name, createdAt FROM chats ORDER BY createdAt DESC")
    .all() as Chat[];
}

export function getChatById(chatId: string): Chat | undefined {
  return db
    .prepare("SELECT id, name, createdAt FROM chats WHERE id = ?")
    .get(chatId) as Chat | undefined;
}

export function updateChat(chatId: string, name: string): Chat | null {
  const chat = getChatById(chatId);
  if (!chat) return null;

  const updated: Chat = { ...chat, name: name.trim() };
  db.prepare("UPDATE chats SET name = ? WHERE id = ?").run(updated.name, chatId);
  return updated;
}

export function deleteChat(chatId: string): boolean {
  const result = db.prepare("DELETE FROM chats WHERE id = ?").run(chatId);
  return result.changes > 0;
}

const insertMessage = db.prepare(
  "INSERT INTO messages (id, chatId, userName, content, createdAt) VALUES (?, ?, ?, ?, ?)",
);

export function addMessage(chatId: string, userName: string, content: string): Message | null {
  if (!getChatById(chatId)) {
    return null;
  }

  const message: Message = {
    id: crypto.randomUUID(),
    chatId,
    userName: userName.trim(),
    content: content.trim(),
    createdAt: Date.now(),
  };

  insertMessage.run(
    message.id,
    message.chatId,
    message.userName,
    message.content,
    message.createdAt,
  );
  return message;
}

// Возвращает последние HISTORY_LIMIT сообщений в хронологическом порядке (по возрастанию времени)
export function getChatMessages(chatId: string): Message[] {
  const rows = db
    .prepare(
      "SELECT id, chatId, userName, content, createdAt FROM messages WHERE chatId = ? ORDER BY createdAt DESC LIMIT ?",
    )
    .all(chatId, HISTORY_LIMIT) as Message[];
  return rows.reverse();
}

export function ensureSeedData() {
  const row = db.prepare("SELECT COUNT(*) AS count FROM chats").get() as { count: number };
  if (row.count === 0) {
    createChat("Общий чат");
  }
}
