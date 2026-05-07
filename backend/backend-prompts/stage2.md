# Stage 2 — Модели данных и store

Добавь типы и in-memory хранилище.

## Модели
1. `User`
- `id: string`
- `name: string`

2. `Chat`
- `id: string`
- `name: string`
- `createdAt: number`

3. `Message`
- `id: string`
- `chatId: string`
- `userName: string`
- `content: string`
- `createdAt: number`

## Store
В `store.ts`:
- `users: Map<string, User>`
- `chats: Map<string, Chat>`
- `messages: Map<string, Message[]>` (ключ — `chatId`)

## Функции
- `loginUser(name)` (создать/вернуть пользователя по имени)
- `logoutUser(name)` (на этом этапе можно просто `200 OK` через API)
- `createChat(name)`
- `getChats()`
- `updateChat(chatId, name)`
- `deleteChat(chatId)`
- `addMessage(chatId, userName, content)` (хранить только последние 50)
- `getChatMessages(chatId)` (вернуть последние 50)

## Чеклист
- [ ] Описаны типы `User`, `Chat`, `Message`
- [ ] Реализованы `users/chats/messages` на `Map`
- [ ] Ограничение сообщений: максимум 50
- [ ] Добавлены все функции из требований

