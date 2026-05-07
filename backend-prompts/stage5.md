# Stage 5 — Отправка сообщений (WebSocket)

Добавь обработку сообщений через `socket.io`.

## Входящее событие
- event: `"message:send"`
- payload:

```json
{
  "chatId": "string",
  "userName": "string",
  "content": "string"
}
```

## Логика
1. Валидировать `chatId`, `userName`, `content`
2. Создать `message`
3. Сохранить в store
4. Разослать всем клиентам комнаты `chatId`

## Исходящее событие
- event: `"message:new"`
- payload:

```json
{
  "type": "message",
  "message": {}
}
```

## Обработка ошибок
- event: `"error"`
- payload: `{ "message": "..." }`

## Чеклист
- [ ] Реализован обработчик `"message:send"`
- [ ] Сообщение сохраняется в store
- [ ] Сообщение рассылается в комнату чата
- [ ] Ошибки отправляются через event `"error"`

