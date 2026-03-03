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
          <ChatsLink href="#">Название чата</ChatsLink>
        </ChatsItem>
      </ChatsList>
    </ChatsWrapper>
  );
}
