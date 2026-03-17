import {
  ChatsList,
  ChatsTitle,
  ChatsWrapper,
  ChatsItem,
  ChatsLink,
} from "./chatPageStyle";

export function Chats() {
  return (
    <ChatsWrapper>
      <ChatsTitle>Список чатов</ChatsTitle>
      <ChatsList>
        <ChatsItem>
          <ChatsLink to="/chats/chat-1">Тестовый ЧАТ</ChatsLink>
        </ChatsItem>
      </ChatsList>
    </ChatsWrapper>
  );
}
