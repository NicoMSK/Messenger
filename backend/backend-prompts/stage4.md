# Stage 4 — Socket.io сервер

Создай WebSocket-сервер на `socket.io` без авторизации.

## Server
В `server.ts`:
- Создай `http`-сервер из Express app
- Привяжи `socket.io` к `http`-серверу
- Настрой CORS origin из `CLIENT_URL` (по умолчанию `http://localhost:5173`)

## Join room (что значит “привязать к chatId”)
При подключении:
- получить `chatId` из `socket.handshake.query.chatId`
- если `chatId` валиден, выполнить `socket.join(chatId)`

## chatService (in-memory)
В `services/chatService.ts`:
- `roomUsers: Map<string, Set<string>>` (по желанию для учета подключений)
- `saveMessage(chatId, message)` (через store)
- `getMessages(chatId)` (через store, последние 50)
- `addUserToRoom(chatId, userName)`
- `removeUserFromRoom(chatId, userName)`

## Чеклист
- [ ] Поднят `socket.io` на том же `http`-сервере
- [ ] Реализовано чтение `chatId` из query
- [ ] Реализовано подключение к комнате через `socket.join(chatId)`
- [ ] Реализован `chatService` с базовыми методами

