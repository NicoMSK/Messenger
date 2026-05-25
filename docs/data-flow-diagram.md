# Data Flow Diagram — Messenger

## Общая схема (WebSocket + REST)

```mermaid
flowchart TB
    USER(["👤 Пользователь"])

    subgraph FE ["FRONTEND  (React + Redux)"]
        direction TB

        subgraph UI_LAYER ["UI Layer"]
            UI_LOGIN["LoginPage"]
            UI_CHATLIST["ChatsList"]
            UI_WINDOW["ChatWindow"]
            UI_ADDCHAT["AddNewChatModal"]
        end

        subgraph REDUX ["Redux Store"]
            S_AUTH[("authSlice\nuserName")]
            S_CHATS[("chatsSlice\nchats [ ]")]
            S_MSGS[("messagesSlice\nmessages { chatId: [] }\nunread { chatId: n }")]
        end

        subgraph API_LAYER ["API Layer"]
            REST_CLI["chatApi.ts\n─────────────\ngetChats()\ncreateCha(name)\ndeleteChatApi(id)"]
            WS_SVC["socketService.ts\n─────────────\nconnect(userName)\nopenChat(chatId)\nsendMessage(chatId, content)\naddHandler / removeHandler"]
        end
    end

    subgraph WS_CHANNEL ["⚡ WebSocket  ws://localhost:4000/ws?userName=…"]
        direction LR
        C2S["CLIENT → SERVER\n──────────────\nopen  { chatId }\nmessage:send  { chatId, content }"]
        S2C["SERVER → CLIENT\n──────────────\nhistory  { chatId, messages[] }\nmessage:new  { chatId, message }\nchat:created  { chat }\nerror  { message }"]
    end

    subgraph HTTP_CHANNEL ["🌐 REST  http://localhost:4000"]
        direction LR
        HTTP_REQ["CLIENT → SERVER\n──────────────\nGET  /chat\nPOST  /chat  { name }\nDELETE  /chat/:id"]
        HTTP_RES["SERVER → CLIENT\n──────────────\nChat[]\nChat  (201)\n{ ok: true }"]
    end

    subgraph BE ["BACKEND  (Node.js + Express + ws)"]
        direction TB

        subgraph WS_SERVER ["wsServer.ts"]
            WSS_CONN["on: connection\n→ validate userName\n→ clients.set(ws, userName)"]
            WSS_OPEN["on: message type=open\n→ getMessages(chatId)\n→ send history"]
            WSS_SEND["on: message type=message:send\n→ saveMessage()\n→ broadcastAll(message:new)"]
            WSS_DISC["on: close\n→ clients.delete(ws)"]
        end

        subgraph REST_ROUTES ["Express Routes"]
            RT_GET["GET /chat\n→ getChats()"]
            RT_POST["POST /chat\n→ createChat(name)\n→ broadcastAll(chat:created)"]
            RT_DEL["DELETE /chat/:id\n→ deleteChat(id)"]
        end

        subgraph BE_STORE ["In-Memory Store"]
            BE_CHATS[("chats [ ]\n{ id, name, createdAt }")]
            BE_MSGS[("messages [ ]\n{ id, chatId, userName,\n  content, createdAt }")]
            BE_CLIENTS[("clients\nMap<WebSocket, userName>")]
        end

        BROADCAST["broadcastAll()\n→ итерирует clients\n→ send всем подключённым"]
    end

    %% ── User ↔ UI ──
    USER -->|"вводит имя"| UI_LOGIN
    USER -->|"выбирает чат"| UI_CHATLIST
    USER -->|"пишет сообщение"| UI_WINDOW
    USER -->|"создаёт чат"| UI_ADDCHAT

    %% ── UI ↔ Redux ──
    UI_LOGIN -->|"setUserName"| S_AUTH
    UI_CHATLIST -->|"setChats / addChat / deleteChat"| S_CHATS
    UI_WINDOW -->|"setMessages / addMessage\nclearUnread"| S_MSGS
    S_CHATS -->|"chats[]"| UI_CHATLIST
    S_MSGS -->|"messages[chatId]\nunread[chatId]"| UI_WINDOW

    %% ── UI ↔ API Layer ──
    UI_LOGIN -->|"connect(userName)"| WS_SVC
    UI_CHATLIST -->|"getChats()"| REST_CLI
    UI_CHATLIST -->|"deleteChatApi(id)"| REST_CLI
    UI_ADDCHAT -->|"createChat(name)"| REST_CLI
    UI_CHATLIST -->|"openChat(chatId)"| WS_SVC
    UI_WINDOW -->|"sendMessage(chatId, content)"| WS_SVC

    %% ── Frontend ↔ WebSocket Channel ──
    WS_SVC -->|"JSON frames"| C2S
    S2C -->|"dispatch actions"| WS_SVC
    WS_SVC -->|"history → setMessages\nmessage:new → addMessage / incrementUnread\nchat:created → addChat"| S_CHATS
    WS_SVC -->|"history / message:new"| S_MSGS

    %% ── Frontend ↔ REST Channel ──
    REST_CLI --> HTTP_REQ
    HTTP_RES --> REST_CLI

    %% ── WebSocket Channel ↔ Backend ──
    C2S --> WSS_CONN
    C2S --> WSS_OPEN
    C2S --> WSS_SEND
    WSS_CONN --> S2C
    WSS_OPEN --> S2C
    WSS_SEND --> S2C
    WSS_DISC --> BE_CLIENTS

    %% ── REST Channel ↔ Backend ──
    HTTP_REQ --> RT_GET
    HTTP_REQ --> RT_POST
    HTTP_REQ --> RT_DEL
    RT_GET --> HTTP_RES
    RT_POST --> HTTP_RES
    RT_DEL --> HTTP_RES

    %% ── Backend internals ──
    WSS_CONN --> BE_CLIENTS
    WSS_OPEN --> BE_MSGS
    WSS_OPEN --> BE_CHATS
    WSS_SEND --> BE_MSGS
    WSS_SEND --> BROADCAST
    RT_GET --> BE_CHATS
    RT_POST --> BE_CHATS
    RT_POST --> BROADCAST
    RT_DEL --> BE_CHATS
    BROADCAST --> S2C

    %% ── Styles ──
    classDef wsChannel fill:#fff3cd,stroke:#f0ad4e,color:#000
    classDef httpChannel fill:#d1ecf1,stroke:#17a2b8,color:#000
    classDef store fill:#d4edda,stroke:#28a745,color:#000
    classDef broadcast fill:#f8d7da,stroke:#dc3545,color:#000

    class WS_CHANNEL wsChannel
    class HTTP_CHANNEL httpChannel
    class BE_CHATS,BE_MSGS,BE_CLIENTS,S_AUTH,S_CHATS,S_MSGS store
    class BROADCAST broadcast
```

---

## WebSocket: детальный поток событий

```mermaid
sequenceDiagram
    actor User as 👤 User
    participant FE as Frontend<br/>(socketService)
    participant WS as Backend<br/>(wsServer.ts)
    participant Store as In-Memory Store

    Note over FE,WS: 1. Установка соединения
    User->>FE: вводит имя и логинится
    FE->>WS: new WebSocket(ws://…/ws?userName=Vasya)
    WS->>WS: clients.set(ws, "Vasya")
    alt userName не передан
        WS-->>FE: { type: "error", message: "userName is required" }
        WS->>WS: ws.close()
    end

    Note over FE,WS: 2. Открытие чата (загрузка истории)
    User->>FE: выбирает чат
    FE->>WS: { type: "open", chatId }
    WS->>Store: getMessages(chatId)
    Store-->>WS: Message[]
    WS-->>FE: { type: "history", chatId, messages: [...] }
    FE->>FE: dispatch setMessages(chatId, messages)

    Note over FE,WS: 3. Отправка сообщения
    User->>FE: пишет и отправляет текст
    FE->>WS: { type: "message:send", chatId, content }
    WS->>Store: saveMessage(chatId, userName, content)
    Store-->>WS: Message
    WS-->>FE: broadcastAll → { type: "message:new", chatId, message }
    Note right of WS: Доставляется ВСЕМ<br/>подключённым клиентам
    FE->>FE: dispatch addMessage / incrementUnread

    Note over FE,WS: 4. Создание чата (REST → WS broadcast)
    User->>FE: создаёт новый чат (AddNewChatModal)
    FE->>+WS: POST /chat  { name }
    WS->>Store: createChat(name)
    Store-->>WS: Chat
    WS-->>-FE: 201  Chat (HTTP response)
    WS-->>FE: broadcastAll → { type: "chat:created", chat }
    Note right of WS: HTTP-ответ + WS-событие<br/>одновременно
    FE->>FE: dispatch addChat(chat)

    Note over FE,WS: 5. Отключение
    User->>FE: закрывает вкладку / выходит
    FE->>WS: ws.close()
    WS->>WS: clients.delete(ws)
```

---

## Типы WebSocket-событий

| Направление | Тип события | Поля | Триггер |
|---|---|---|---|
| Client → Server | `open` | `chatId` | Пользователь открывает чат |
| Client → Server | `message:send` | `chatId`, `content` | Пользователь отправляет сообщение |
| Server → Client | `history` | `chatId`, `messages[]` | Ответ на `open` |
| Server → Client | `message:new` | `chatId`, `message` | Broadcast при сохранении сообщения |
| Server → Client | `chat:created` | `chat` | Broadcast при `POST /chat` |
| Server → Client | `error` | `message` | Ошибка валидации / сервера |
