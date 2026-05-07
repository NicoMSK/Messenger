# Stage 1 — Bootstrap backend

Создай backend-проект на Node.js с TypeScript в папке `backend/`.

## Требования
- Используй `Express`
- Используй `Socket.io`
- Структура проекта должна быть модульной и масштабируемой
- Без лишних усложнений, код понятный
- Классы можно использовать, если это делает код проще

## Структура
- `backend/src/index.ts` (точка входа)
- `backend/src/server.ts` (инициализация express, http и socket.io)
- `backend/src/routes/auth.ts`
- `backend/src/routes/chat.ts`
- `backend/src/routes/message.ts` (может не понадобиться, если сообщения только через WS — можно оставить пустым или не создавать)
- `backend/src/websocket/socket.ts`
- `backend/src/store/store.ts` (in-memory хранилище)
- `backend/src/types/index.ts`

## Настрой
- `backend/package.json`
- `backend/tsconfig.json`

## Чеклист
- [ ] Создана папка `backend/` и базовая структура `src/*`
- [ ] Настроены `package.json` и `tsconfig.json`
- [ ] Сервер запускается в dev-режиме

