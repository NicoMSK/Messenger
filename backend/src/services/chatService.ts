import type { Message } from "../types/index.js";
import { addMessage, getChatMessages } from "../store/store.js";

const roomUsers = new Map<string, Set<string>>();

export function addUserToRoom(chatId: string, userName: string) {
  if (!roomUsers.has(chatId)) {
    roomUsers.set(chatId, new Set());
  }

  roomUsers.get(chatId)?.add(userName);
}

export function removeUserFromRoom(chatId: string, userName: string) {
  const set = roomUsers.get(chatId);
  if (!set) return;

  set.delete(userName);
  if (set.size === 0) {
    roomUsers.delete(chatId);
  }
}

export function saveMessage(chatId: string, userName: string, content: string): Message | null {
  return addMessage(chatId, userName, content);
}

export function getMessages(chatId: string): Message[] {
  return getChatMessages(chatId);
}

