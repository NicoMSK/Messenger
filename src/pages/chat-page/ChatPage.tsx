import { useNavigate, useParams } from "react-router-dom";
import { useEscClose } from "../../shared/hooks/useEscClose";
import { ChatsContent, ChatSection } from "./chatPageStyle";
import { Chats } from "./ChatsList";
import { AddNewChat } from "./AddNewChatPage";
import { useState } from "react";
import { ChatWindow } from "./ChatWindow";
import { EmptyChatPage } from "../../shared/components/EmptyChatPage";

const MOCK_INITIAL_CHATS = [
  { id: "chat-1", title: "Тестовый ЧАТ" },
  { id: "chat-2", title: "Тестовый ЧАТ-2" },
  { id: "chat-3", title: "Тестовый ЧАТ-3" },
  { id: "chat-4", title: "Тестовый ЧАТ-4" },
];

export function ChatPage() {
  const { chatId } = useParams();
  const [isNewChat, setIsNewChat] = useState(false);
  const navigate = useNavigate();

  const [chats, setChats] = useState(MOCK_INITIAL_CHATS);

  function addChat(inputValue: string) {
    const newChatId = crypto.randomUUID();

    if (inputValue.trim().length === 0) return;

    setChats((chats) => {
      return [
        ...chats,
        {
          id: newChatId,
          title: inputValue,
        },
      ];
    });

    setIsNewChat(false);
    navigate(`/chats/${newChatId}`);
  }

  function openAddChat() {
    navigate("/chats");
    setIsNewChat(true);
  }

  function renderContent() {
    if (isNewChat && !chatId)
      return <AddNewChat addChat={addChat} clouseForm={closeModal} />;
    if (chatId) return <ChatWindow />;

    return <EmptyChatPage />;
  }

  function closeModal() {
    navigate("/chats");
    setIsNewChat(false);
  }

  useEscClose(closeModal);

  return (
    <ChatSection>
      <Chats openAddChat={openAddChat} chatsData={chats} />
      <ChatsContent>{renderContent()}</ChatsContent>
    </ChatSection>
  );
}
