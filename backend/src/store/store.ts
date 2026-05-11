import crypto from "crypto";
import type { Chat, Message, User } from "../types/index.js";

const MAX_MESSAGES_PER_CHAT = 50;

const users = new Map<string, User>();
const chats = new Map<string, Chat>();
const messages = new Map<string, Message[]>();

export function loginUser(name: string): User {
  const normalized = name.trim();

  for (const user of users.values()) {
    if (user.name === normalized) {
      return user;
    }
  }

  const user: User = { id: crypto.randomUUID(), name: normalized };
  users.set(user.id, user);
  return user;
}

export function createChat(name: string): Chat {
  const chat: Chat = { id: crypto.randomUUID(), name: name.trim(), createdAt: Date.now() };
  chats.set(chat.id, chat);
  messages.set(chat.id, []);
  return chat;
}

export function getChats(): Chat[] {
  return Array.from(chats.values()).sort((a, b) => b.createdAt - a.createdAt);
}

export function getChatById(chatId: string): Chat | undefined {
  return chats.get(chatId);
}

export function updateChat(chatId: string, name: string): Chat | null {
  const chat = chats.get(chatId);
  if (!chat) return null;

  const updated: Chat = { ...chat, name: name.trim() };
  chats.set(chatId, updated);
  return updated;
}

export function deleteChat(chatId: string): boolean {
  const existed = chats.delete(chatId);
  messages.delete(chatId);
  return existed;
}

export function addMessage(chatId: string, userName: string, content: string): Message | null {
  if (!chats.has(chatId)) {
    return null;
  }

  const message: Message = {
    id: crypto.randomUUID(),
    chatId,
    userName: userName.trim(),
    content: content.trim(),
    createdAt: Date.now(),
  };

  const list = messages.get(chatId) ?? [];
  list.push(message);

  if (list.length > MAX_MESSAGES_PER_CHAT) {
    list.splice(0, list.length - MAX_MESSAGES_PER_CHAT);
  }

  messages.set(chatId, list);
  return message;
}

export function getChatMessages(chatId: string): Message[] {
  return messages.get(chatId) ?? [];
}

export function ensureSeedData() {
  if (chats.size === 0) {
    createChat("Общий чат");
  }
}

