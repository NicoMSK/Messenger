import { useState } from "react";
import { AddNewChat } from "./AddNewChat";
import { ChatsTitle, ChatsWrapper } from "./chatPageStyle";
import { ChatsItem, ChatsLink, ChatsList } from "./ChatsListStyle";

export function Chats() {
  const [chats, setChats] = useState([
    { id: "chat-1", title: "Тестовый ЧАТ" },
    { id: "chat-2", title: "Тестовый ЧАТ-2" },
    { id: "chat-3", title: "Тестовый ЧАТ-3" },
    { id: "chat-4", title: "Тестовый ЧАТ-4" },
  ]);

  function addChat() {
    setChats((posts) => {
      return [
        ...posts,
        {
          id: String(crypto.randomUUID()),
          title: "пробный",
        },
      ];
    });
  }

  return (
    <ChatsWrapper>
      <ChatsTitle>Список чатов</ChatsTitle>
      <ChatsList>
        {chats.map((chat) => (
          <ChatsItem key={chat.id}>
            <ChatsLink to={`/chats/${chat.id}`}>{chat.title}</ChatsLink>
          </ChatsItem>
        ))}
      </ChatsList>
      <AddNewChat addChat={addChat} />
    </ChatsWrapper>
  );
}
