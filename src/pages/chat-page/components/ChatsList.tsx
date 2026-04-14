import { AddNewChatButton } from "./AddNewChatButton";
import { ChatsTitle, ChatsWrapper } from "../ChatPage.styles";
import { ChatsItem, ChatsLink, ChatsList } from "./ChatsList.styles";

export type ChatProp = {
  openAddChat: () => void;
  chatsData: {
    id: string;
    title: string;
  }[];
  chatId: string | null;
};

export function Chats({ openAddChat, chatsData, chatId }: ChatProp) {
  return (
    <ChatsWrapper>
      <ChatsTitle>Список чатов</ChatsTitle>
      <ChatsList>
        {chatsData.map((chat) => (
          <ChatsItem key={chat.id}>
            <ChatsLink
              isActive={chatId === chat.id}
              to={`/chats?chatId=${chat.id}`}
            >
              {chat.title}
            </ChatsLink>
          </ChatsItem>
        ))}
      </ChatsList>
      <AddNewChatButton openAddChat={openAddChat} />
    </ChatsWrapper>
  );
}
