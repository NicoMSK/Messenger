import { AddNewChatButton } from "./AddNewChatButton";
import { ChatsTitle, ChatsWrapper } from "./chatPageStyle";
import { ChatsItem, ChatsLink, ChatsList } from "./ChatsListStyle";

export type ChatProp = {
  openAddChat: () => void;
  chatsData: {
    id: string;
    title: string;
  }[];
};

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
      <AddNewChatButton openAddChat={openAddChat} />
    </ChatsWrapper>
  );
}

// 2) сделать чтоб закрывалась форма добавления чата, когда чат добавлен
// 4) если открыта форма добавления, и если открыть любой чат, то форма должна закрыться и открыться выбранный чат
/// 5) поправить кнопки, что не слипались
