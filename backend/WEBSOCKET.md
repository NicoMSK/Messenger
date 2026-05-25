# WebSocket API

## Подключение

**URL:** `ws://localhost:4000/ws?userName=<имя>`

Параметр `userName` обязателен — сервер закрывает соединение, если он не передан.

```ts
const ws = new WebSocket(`ws://localhost:4000/ws?userName=${encodeURIComponent(userName)}`);
```

---

## Сообщения от клиента → серверу

Все сообщения отправляются как JSON-строка (`ws.send(JSON.stringify(payload))`).

### Открыть чат (получить историю)

```json
{ "type": "open", "chatId": "<id>" }
```

Сервер ответит событием `history`.

### Отправить сообщение

```json
{ "type": "message:send", "chatId": "<id>", "content": "текст" }
```

`userName` берётся из параметра подключения — передавать его в payload не нужно.

---

## События от сервера → клиенту

### `history` — история чата

Приходит в ответ на `open`. Загрузить сообщения в Redux-стор.

```ts
type HistoryEvent = {
  type: "history";
  chatId: string;
  messages: Message[];
};
```

### `message:new` — новое сообщение

Рассылается **всем** подключённым клиентам при отправке любого сообщения.

```ts
type MessageNewEvent = {
  type: "message:new";
  chatId: string;
  message: Message;
};
```

### `chat:created` — создан новый чат

Рассылается **всем** клиентам при `POST /chat`. Обновить список чатов без перезагрузки.

```ts
type ChatCreatedEvent = {
  type: "chat:created";
  chat: Chat;
};
```

### `error` — ошибка

```ts
{ type: "error"; message: string }
```

Причины: чат не найден, пустой `content`, невалидный JSON.

---

## Общие типы

```ts
type Message = {
  id: string;
  chatId: string;
  userName: string;
  content: string;
  createdAt: number; // Unix ms
};

type Chat = {
  id: string;
  name: string;
  createdAt: number; // Unix ms
};
```

---

## REST API (кратко)

| Метод | Путь | Тело | Описание |
|-------|------|------|----------|
| `POST` | `/login` | `{ name }` | Войти / зарегистрироваться |
| `POST` | `/logout` | `{ name }` | Выйти |
| `GET` | `/chat` | — | Список всех чатов |
| `POST` | `/chat` | `{ name }` | Создать чат (бродкастит `chat:created`) |
| `PATCH` | `/chat/:id` | `{ name }` | Переименовать чат |
| `DELETE` | `/chat/:id` | — | Удалить чат |

---

## Пример: минимальный клиент

```ts
const ws = new WebSocket(`ws://localhost:4000/ws?userName=${encodeURIComponent(userName)}`);

ws.onopen = () => {
  ws.send(JSON.stringify({ type: "open", chatId }));
};

ws.onmessage = (e) => {
  const event = JSON.parse(e.data);

  switch (event.type) {
    case "history":
      dispatch(setMessages(event.messages));
      break;
    case "message:new":
      dispatch(addMessage(event.message));
      break;
    case "chat:created":
      dispatch(addChat(event.chat));
      break;
    case "error":
      console.error("WS error:", event.message);
      break;
  }
};

// Отправить сообщение
ws.send(JSON.stringify({ type: "message:send", chatId, content: "привет" }));
```
