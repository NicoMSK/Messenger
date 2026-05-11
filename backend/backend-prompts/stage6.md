# Stage 6 — История при подключении (WebSocket)

При подключении сокета:
- Получить `chatId` из `socket.handshake.query.chatId`
- Если `chatId` валиден:
  - `socket.join(chatId)`
  - отправить клиенту последние сообщения чата (до 50)

## Событие
- event: `"history"`
- payload:

```json
{
  "type": "history",
  "messages": []
}
```

Используй `store`/`chatService`.

## Чеклист
- [ ] Чтение `chatId` из query реализовано
- [ ] Клиент добавляется в комнату `chatId`
- [ ] История отправляется сразу после подключения

