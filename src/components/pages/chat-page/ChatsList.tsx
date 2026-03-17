import { AddNewChat, type ChatProp } from "./AddNewChatButton";
import { ChatsTitle, ChatsWrapper } from "./chatPageStyle";
import { ChatsItem, ChatsLink, ChatsList } from "./ChatsListStyle";

export function Chats({ openAddChat, chatsData }: ChatProp) {
  return (
    <ChatsWrapper>
      <ChatsTitle>Список чатов</ChatsTitle>
      <ChatsList>
        {chatsData.map((chat) => (
          <ChatsItem key={chat.id}>
            <ChatsLink to={`/chats/${chat.id}`}>{chat.title}</ChatsLink>
          </ChatsItem>
        ))}
      </ChatsList>
      <AddNewChat openAddChat={openAddChat} />
    </ChatsWrapper>
  );
}
