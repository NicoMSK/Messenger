import { AddNewChatButton } from "./AddNewChatButton";
import { ChatsTitle, ChatsWrapper } from "../ChatPage.styles";
import { ChatsItem, ChatsLink, ChatsList } from "./ChatsList.styles";
import { useAppSelector } from "../../../store/store-hooks";

export type ChatProp = {
  openAddChat: () => void;
  chatId: string | null;
};

export function Chats({ openAddChat, chatId }: ChatProp) {
  const chatsData = useAppSelector((state) => state.chat.chats);

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
