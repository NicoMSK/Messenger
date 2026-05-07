# Stage 3 — REST API (auth + chat CRUD)

Добавь REST API.

## Auth
- `POST /login`
  - body: `{ name }`
  - создать/вернуть пользователя
- `POST /logout`
  - body: `{ name }`
  - на этом этапе stateless: просто `200 OK`

## Chat (CRUD)
- `POST /chat`
  - body: `{ name }`
  - создать чат
- `GET /chat`
  - вернуть список чатов
- `PATCH /chat/:id`
  - body: `{ name }`
  - обновить имя чата
- `DELETE /chat/:id`
  - удалить чат

## Message
- Отправка и получение сообщений только через WebSocket (`socket.io`)

## Требования
- Используй `store.ts`
- Подключи роуты в `server.ts`
- Добавь базовую валидацию и понятные ошибки (`400`, `404`)

## Чеклист
- [ ] Реализованы `/login` и `/logout`
- [ ] Реализован CRUD для `/chat`
- [ ] Сообщения работают только через WebSocket (без REST endpoint для сообщений)
- [ ] Есть базовая валидация входных данных

