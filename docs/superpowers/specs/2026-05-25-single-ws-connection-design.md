# Single WebSocket Connection + Unread Notifications

**Date:** 2026-05-25
**Branch:** web-socket

## Goal

Replace per-chat WebSocket connections with a single persistent connection per user session. Users receive `message:new` events from all chats simultaneously and see an unread badge on chat list items when a message arrives in a chat they are not currently viewing.

## Protocol

Connection URL:
```
ws://localhost:4000/ws?userName=<name>
```

### Client → Server

| Event | Payload | When |
|---|---|---|
| `open` | `{type, chatId}` | User opens a chat — requests history |
| `message:send` | `{type, chatId, content}` | User submits a message |

`userName` is not repeated in messages — the server reads it from the connection query string.

### Server → Client

| Event | Payload | When |
|---|---|---|
| `history` | `{type, chatId, messages[]}` | Response to `open` |
| `message:new` | `{type, chatId, message}` | New message in any chat |
| `error` | `{type, message}` | Invalid request |

## Architecture

### Connection lifecycle

The connection is established in `ChatPage` on mount and closed on unmount. `ChatWindow` no longer manages the connection — it only calls `socketService.openChat(chatId)` on mount to request history.

```
Login → ChatPage mounts → socketService.connect(userName)
User opens chat → ChatWindow mounts → socketService.openChat(chatId) → history arrives
User switches chat → ChatWindow unmounts (no disconnect) → new ChatWindow → openChat(newChatId)
User logs out / leaves → ChatPage unmounts → socketService.disconnect()
```

### Broadcast strategy

Because all chats are public (every user sees every chat), the server broadcasts every `message:new` to **all connected WebSocket clients**. No per-chat room tracking is needed for delivery. The server still uses `userName` from the connection to set `message.userName` when saving.

### Unread counts

Unread counts live in `messagesSlice` as `unread: { [chatId: string]: number }`.

- `message:new` arrives for `chatId !== activeChatId` → `incrementUnread(chatId)`
- User opens a chat → `clearUnread(chatId)` (dispatched in `ChatPage` alongside `openChat`)

`activeChatId` is the `chatId` URL param, already available in `ChatPage`.

## Files changed

### Backend

**`backend/src/websocket/wsServer.ts`**
- Parse `?userName` from connection URL (reject if missing)
- Store `Map<userName, WebSocket>` for connected clients
- Handle `{type: "open", chatId}` → send `{type: "history", chatId, messages[]}`
- Handle `{type: "message:send", chatId, content}` → save message (userName from connection) → broadcast `{type: "message:new", chatId, message}` to all connected clients
- Remove per-chat room logic (`rooms` Map, `getRoom`, `broadcast` by chatId)

### Frontend

**`frontend/src/api/socketService.ts`**
- `connect(userName: string)` — was `connect(chatId: string)`
- `openChat(chatId: string)` — new method, sends `{type: "open", chatId}`
- `sendMessage(chatId, content)` — removes `userName` parameter
- `WsEvent` type: `history` gains `chatId` field

**`frontend/src/pages/chat-page/ChatPage.tsx`**
- On mount: `socketService.connect(currentUser.name)` + `socketService.addHandler(globalHandler)`
- On unmount: `socketService.removeHandler` + `socketService.disconnect()`
- `globalHandler` dispatches:
  - `history` → `setMessages({chatId, messages})`
  - `message:new` → `addMessage({chatId, message})` + `incrementUnread(chatId)` if `chatId !== activeChatId`

**`frontend/src/pages/chat-page/components/ChatWindow.tsx`**
- Removes `socketService.connect` / `socketService.disconnect` calls
- On mount: `socketService.openChat(chatId)` + dispatch `clearUnread(chatId)`
- No longer adds its own WS handler (events handled in `ChatPage`)

**`frontend/src/pages/chat-page/components/ChatForm.tsx`**
- `socketService.sendMessage(chatId, content)` — drops `userName` argument

**`frontend/src/store/slices/messagesSlice.ts`**
- Adds `unread: { [chatId: string]: number }` to state
- New reducers: `incrementUnread(chatId)`, `clearUnread(chatId)`

**`frontend/src/pages/chat-page/components/ChatsList.tsx`**
- Reads `unread[chat.id]` from Redux and renders a badge when value > 0

## Error handling

- Server rejects connection without `?userName` with `{type: "error", message: "userName is required"}` and closes the socket.
- Server rejects `open` or `message:send` with unknown `chatId` with `{type: "error", message: "chat not found"}`.
- Client ignores malformed frames (existing `try/catch` in `onmessage`).

## Out of scope

- Authentication / session tokens (userName is trusted as-is)
- Per-user chat membership (all chats remain public)
- Unread persistence across page reloads
